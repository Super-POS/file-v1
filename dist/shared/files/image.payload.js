"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filePayload = (fileName, filePath, buffer, mimetype) => ({
    fieldname: "image",
    filename: fileName,
    originalname: fileName,
    mimetype,
    destination: filePath,
    path: filePath,
    size: buffer.length,
    encoding: "from-base64",
});
exports.default = filePayload;
