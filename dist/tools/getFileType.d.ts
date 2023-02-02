/// <reference types="node" />
declare const getFileType: (data: string | Buffer) => Promise<import("file-type/core").FileTypeResult>;
export default getFileType;
