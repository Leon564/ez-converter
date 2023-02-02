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
const loadFile_1 = __importDefault(require("./loadFile"));
const processFile_1 = __importDefault(require("./processFile"));
const getFileType_1 = __importDefault(require("../tools/getFileType"));
const mediaToBuffer_1 = __importDefault(require("./mediaToBuffer"));
const downloadFile_1 = __importDefault(require("../tools/downloadFile"));
const converter = (options) => __awaiter(void 0, void 0, void 0, function* () {
    options.file = yield (0, mediaToBuffer_1.default)(options.file);
    const { ext, mime } = yield (0, getFileType_1.default)(options.file);
    const sourceFormat = mime.includes('video') ? 'video' : ext;
    const url = yield (0, loadFile_1.default)({
        file: options.file,
        fileExt: ext,
        sourceFormat,
        targetFormat: options.targetFormat
    });
    const processResult = yield (0, processFile_1.default)(Object.assign({ url }, options));
    return (0, downloadFile_1.default)(processResult);
});
exports.default = converter;
