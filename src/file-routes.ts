import {Router} from 'express';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as formidableParser from 'formidable';

import FileData from './file-data';

const fileRouter = Router();

// get meta.json util
const metaJsonPath:string = path.join(__dirname, '../meta.json');
const readMetaJson = ():Promise<FileData[]> => util.promisify(fs.readFile)(metaJsonPath)
  .then(buff => JSON.parse(buff.toString())); // buff.toString or typescript complains!
const writeMetaJson = (data: FileData[]):Promise<void> => util.promisify(fs.writeFile)(metaJsonPath, JSON.stringify(data, null, 2));

/*
  GET @ /api/files/meta
  returns: array<FileData>
 */
fileRouter.get('/meta', async (req, res):Promise<void> => {
  try {
    const metaData: FileData[] = await readMetaJson();
    res.status(200).json(metaData);
  } catch (err) {
    res.status(500).send(err);
  }
})

/*
  POST @ /api/files/upload
  returns: array<FileData>

  TODO: generate uuid, send uuid to client. Then find files by uuid - so can save files with same name..
 */
fileRouter.post('/upload', async (req, res):Promise<void> => {
  try {
    const formParser = new formidableParser()
    // rename file: https://github.com/felixge/node-formidable
    formParser.on('fileBegin', (name, file) => {
      file.path = path.join(__dirname, '../uploads', file.name);
    })
    formParser.parse(req, async (err, fields, file) => {
      if(err){
        console.log(err);
        res.status(500).send(err)
        return;
      }
      const fileData:FileData = file.data;
      const meta:FileData[] = await readMetaJson();
      meta.push(fileData);
      await writeMetaJson(meta);
      res.status(200).send(meta);  
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

export default fileRouter;