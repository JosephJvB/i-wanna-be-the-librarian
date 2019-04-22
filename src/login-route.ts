import {Router} from 'express';
import * as uuid from 'uuid/v4';

const loginRouter = Router();

const validHashes:{hash:string, exp:Date}[] = [];

loginRouter.get('/', (req, res, next) => {

  const AUTH_HASH:string = uuid();
  console.log(`
    --- AUTH HASH START ---\n
    ${AUTH_HASH}\n
    --- AUTH HASH END ---
  `)
  // lasts for 10 mins
  const bestBefore:Date = new Date();
  bestBefore.setMinutes(bestBefore.getMinutes() + 5) ;
  // add
  validHashes.push({
    hash: AUTH_HASH,
    exp: bestBefore
  })

  // dont use res object, call next to keep serving static file.
  next();
});

export function loginMiddleware(req, res, next):void {
  // error1
  if(!req.query.hash) {
    next('No hash on file request, authorization failed');
    return;
  }
  // error2
  const matchHash:{hash:string, exp:Date} = validHashes.find(h => h.hash === req.query.hash);
  if(!matchHash) {
    next('No valid hash found, authorization failed');
    return;
  }
  // error 3
  if(matchHash.exp.getTime() < Date.now()) {
    next('Given hash is past its best-before, authorization failed');
    return;
  }
  // you're all good mate go thru
  next();
};

export default loginRouter;