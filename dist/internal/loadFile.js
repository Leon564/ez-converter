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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const form_data_1 = __importDefault(require("form-data"));
const constants_1 = require("../shared/constants");
const loadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new form_data_1.default();
    data.append('new-image', file.file, `image.${file.fileExt}`);
    const result = yield (0, axios_1.default)({
        method: 'POST',
        url: `${constants_1.BASE_URL}/${file.sourceFormat}-to-${file.targetFormat}`,
        data,
        headers: data.getHeaders()
    });
    const $ = (0, cheerio_1.load)(result.data);
    const newUrl = $('form').attr('action');
    return newUrl.includes('.com') ? newUrl : constants_1.BASE_URL + newUrl;
});
exports.default = loadFile;
