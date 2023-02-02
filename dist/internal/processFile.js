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
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const processFile = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new form_data_1.default();
    if (!options.url)
        throw new Error('Error in processFile: The new url was not generated correctly');
    const file = options.url.substring(options.url.lastIndexOf('/') + 1);
    data.append('file', file);
    data.append('start', options.startTime);
    data.append('end', options.endTime);
    data.append('percentage', options.quality);
    data.append('background', options.background);
    data.append('size', options.size);
    data.append('fps', options.fps);
    data.append('method', options.method);
    data.append('diff', options.diff.toString());
    data.append('loop', options.loop.toString());
    const result = yield axios_1.default.post(options.url, data, {
        headers: data.getHeaders()
    });
    const $ = (0, cheerio_1.load)(result.data);
    const outputArea = $('div#output').html();
    if (!outputArea)
        throw new Error(result.data.replace(new RegExp('<br />'), '\n'));
    const output = (0, cheerio_1.load)(outputArea);
    return output('a[class=save]').attr('href');
});
exports.default = processFile;
