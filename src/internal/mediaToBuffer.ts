import downloadFile from '../tools/downloadFile';
import validator from 'validator';
import { readFileSync } from 'fs-extra';

const mediaToBuffer = async (file:string|Buffer): Promise<Buffer> => {
  if (!Buffer.isBuffer(file)) {
    if (validator.isURL(file)) file = await downloadFile(file);
    else file = readFileSync(file);
  }
  return file;
};

export default mediaToBuffer;
