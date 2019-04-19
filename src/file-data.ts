// no idea what Im doing. What is best practise please?
interface IData {
  size: number;
  path: string;
  name: string;
  type: string;
  mtime: Date;
}
export default class FileData implements IData {
  public readonly id: string;
  public size: number;
  public path: string;
  public name: string;
  public type: string;
  public mtime: Date;
  constructor(data:IData, uniqueId:string){
      this.id = uniqueId;
      this.size = data.size;
      this.path = data.path;
      this.name = data.name;
      this.type = data.type;
      this.mtime = data.mtime;
  }
}
