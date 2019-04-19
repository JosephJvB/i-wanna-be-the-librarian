const fs = require('fs');
const util = require('util');
const path = require('path');

import { FileMetaData, IFileService } from'./TYPES';

export default class FileService implements IFileService {

  private readonly META_PATH:string = path.join(__dirname, '../meta.json');
  private GetUploadPath = (file):string => path.join(__dirname, '../uploads', file);

  public async readMetaJson():Promise<FileMetaData[]> {
    const meta:FileMetaData[] = util.promisify(fs.readFile)(this.META_PATH).then(JSON.parse);
    return meta;
  }

  public fileExists(file:string): boolean {
    return fs.existsSync(this.GetUploadPath(file));
  }

  // todo: model for file
  public async saveUploadedFile(file:any):Promise<FileMetaData[]> {

    // save new file
    const writePath = this.GetUploadPath(file.name);
    // wx flag means throw error if file already exists! Prevent overwrite.
    await util.promisify(fs.writeFile)(writePath, file, {flag: 'wx'});

    // update meta.json
    const meta:FileMetaData[] = await this.readMetaJson();
    const nextFileMeta:FileMetaData = {
      name: file.name,
      path: file.path,
      ext: file.ext
    };
    meta.push(nextFileMeta);
    await util.promisify(fs.writeFile)(this.META_PATH, meta);

    return meta;
  }
}