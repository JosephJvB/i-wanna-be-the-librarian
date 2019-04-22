import {Router} from 'express';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as formidableParser from 'formidable';
import { generateCombination } from 'gfycat-style-urls';

import FileData from './file-data';

const fileRouter = Router();

// get meta.json util
const metaJsonPath:string = path.join(__dirname, '../meta.json');
const readMetaJson = ():Promise<FileData[]> => util.promisify(fs.readFile)(metaJsonPath)
  .then(buff => JSON.parse(buff.toString())); // buff.toString or typescript complains!
const writeMetaJson = (data: FileData[]):Promise<void> => util.promisify(fs.writeFile)(metaJsonPath, JSON.stringify(data, null, 2));

/***ROUTE***
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

/***ROUTE***
  POST @ /api/files/upload
  returns: array<FileData>
*/
fileRouter.post('/upload', async (req, res):Promise<void> => {
  try {
    const formParser = new formidableParser();
    // gen unique id:adj,adj,animal
    const uniqueId:string = await generateUniqueId();
    // rename filePath: https://github.com/felixge/node-formidable
    formParser.on('fileBegin', (name, file) => {
      const ext:string = file.name.split('.').pop();
      file.path = path.join(__dirname, '../uploads', uniqueId + '.' + ext);
    });
    formParser.parse(req, async (err, fields, file) => {
      if(err){
        console.log(err);
        res.status(500).send(err)
        return;
      }
      if(!file.data) {
        res.status(400).send("Bad Request, no file data present");
        return;
      }
      const fileData = new FileData(file.data, uniqueId);
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

async function generateUniqueId():Promise<string> {
  let id:string = generateCombination(2, '', true);
  const metaJson = await util.promisify(fs.readFile)(path.join(__dirname, '../meta.json'))
  const existingIds:string[] = JSON.parse(metaJson.toString())
      .map(i => i.id);
  while(existingIds.includes(id)) {
    id = generateCombination(2, '', true);
  }
  return id;
}

export default fileRouter;