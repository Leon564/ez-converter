"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ezGif = void 0;
const converter_1 = __importDefault(require("./converter"));
const fs_extra_1 = require("fs-extra");
class ezGif {
    constructor(file) {
        this.file = file;
        const defaultOptions = {
            targetFormat: 'gif',
            background: '#ffffff',
            diff: 'off',
            endTime: 10,
            fps: 10,
            loop: true,
            method: 'ffmpeg',
            quality: 100,
            startTime: 0,
            size: 'original',
            file: this.file
        };
        this.Metadata = defaultOptions;
    }
    setTargetFormat(format) {
        this.Metadata.targetFormat = format;
        return this;
    }
    setBackground(color) {
        this.Metadata.background = color;
        return this;
    }
    setDiff(diff) {
        this.Metadata.diff = diff;
        return this;
    }
    setEndTime(time) {
        this.Metadata.endTime = time;
        return this;
    }
    setFps(fps) {
        this.Metadata.fps = fps;
        return this;
    }
    setLoop(loop) {
        this.Metadata.loop = loop;
        return this;
    }
    setMethod(method) {
        this.Metadata.method = method;
        return this;
    }
    setQuality(quality) {
        this.Metadata.quality = quality;
        return this;
    }
    setStartTime(time) {
        this.Metadata.startTime = time;
        return this;
    }
    setSize(size) {
        this.Metadata.size = size;
        return this;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Metadata.file)
                throw new Error('No file provided');
            if (!this.Metadata.targetFormat)
                throw new Error('No target format provided');
            this.result = yield (0, converter_1.default)(this.Metadata);
            return this;
        });
    }
    toBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.result)
                yield this.build();
            return this.result;
        });
    }
    defaultFileName() {
        const date = new Date();
        return `ezgif-${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.${this.Metadata.targetFormat}`;
    }
    toFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.result)
                yield this.build();
            return (0, fs_extra_1.writeFile)(path || this.defaultFileName(), this.result);
        });
    }
}
exports.ezGif = ezGif;
