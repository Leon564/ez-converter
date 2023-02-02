/// <reference types="node" />
import { Formats } from '../metadata/formats';
import { ConvertionMethod } from '../metadata/convertionMethods';
import { Sizes } from '../metadata/sizes';
export declare class ezGif {
    private file;
    private Metadata;
    private result;
    constructor(file: string | Buffer);
    setTargetFormat(format: Formats | string): this;
    setBackground(color: string): this;
    setDiff(diff: 'on' | 'off'): this;
    setEndTime(time: number): this;
    setFps(fps: number): this;
    setLoop(loop: boolean): this;
    setMethod(method: ConvertionMethod): this;
    setQuality(quality: number): this;
    setStartTime(time: number): this;
    setSize(size: Sizes | string): this;
    private build;
    toBuffer(): Promise<Buffer | undefined>;
    private defaultFileName;
    toFile(path?: string): Promise<void>;
}
