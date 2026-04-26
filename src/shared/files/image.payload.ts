import FilePayload from "./payload.interface";

const filePayload = (
    fileName: string,
    filePath: string,
    buffer: Buffer,
    mimetype: string,
): FilePayload => ({
    fieldname: "image",
    filename: fileName,
    originalname: fileName,
    mimetype,
    destination: filePath,
    path: filePath,
    size: buffer.length,
    encoding: "from-base64",
});

export default filePayload;