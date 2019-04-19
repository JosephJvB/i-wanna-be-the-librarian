export interface FileMetaData {
  path:string;
  name:string;
  ext:string;
}

export interface IFileService {
  readMetaJson(): Promise<FileMetaData[]>;
}