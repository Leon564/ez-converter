import { IProcessFile } from '../interfaces/types';
declare const processFile: (options: IProcessFile) => Promise<string | undefined>;
export default processFile;
