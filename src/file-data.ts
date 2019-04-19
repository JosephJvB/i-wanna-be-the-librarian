// no idea what Im doing. What is best practise please?
interface IData {
  size: number;
  path: string;
  name: string;
  type: string;
  mtime: Date;
}
export default class FileData implements IData {
  constructor(
    public size: number,
    public path: string,
    public name: string,
    public type: string,
    public mtime: Date
  ){};
}
