/// <reference types="node" />
import { IOptions } from '../interfaces/types';
declare const converter: (options: IOptions) => Promise<Buffer>;
export default converter;
