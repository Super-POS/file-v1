export type ParsedImage = {
  buffer: Buffer;
  ext: string;
  mimetype: string;
};

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/pjpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

/**
 * Decodes a data-URL (data:image/png;base64,...) or bare base64; returns buffer + file extension.
 */
export function parseImageBase64(imageBase64: string): ParsedImage {
  const trimmed = (imageBase64 || "").trim();
  const m = trimmed.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (m) {
    const mimetype = m[1].toLowerCase();
    const b64 = m[2].replace(/\s/g, "");
    const ext =
      MIME_TO_EXT[mimetype] ||
      mimetype.split("/")[1].replace(/[^a-z0-9]/gi, "") ||
      "bin";
    return {
      buffer: Buffer.from(b64, "base64"),
      ext,
      mimetype,
    };
  }
  // Legacy: optional data URL prefix, else assume raw base64 = jpeg
  const data = trimmed.replace(/^data:image\/\w+;base64,/, "");
  return {
    buffer: Buffer.from(data, "base64"),
    ext: "jpg",
    mimetype: "image/jpeg",
  };
}

/** @deprecated use parseImageBase64 when extension matters */
const extractImageBuffer = (imageBase64: string): Buffer =>
  parseImageBase64(imageBase64).buffer;

export default extractImageBuffer;
