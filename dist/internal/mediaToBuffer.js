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
const downloadFile_1 = __importDefault(require("../tools/downloadFile"));
const validator_1 = __importDefault(require("validator"));
const fs_extra_1 = require("fs-extra");
const mediaToBuffer = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Buffer.isBuffer(file)) {
        if (validator_1.default.isURL(file))
            file = yield (0, downloadFile_1.default)(file);
        else
            file = (0, fs_extra_1.readFileSync)(file);
    }
    return file;
});
exports.default = mediaToBuffer;
