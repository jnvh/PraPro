import fs from "fs";
import FileType from "file-type";

export async function buffertoGeoTiff(arrayBuffer: ArrayBuffer) {
    const buffer = Buffer.from(arrayBuffer);
    const fileType = await FileType.fromBuffer(buffer);
    if (fileType != undefined && fileType.ext) {
        const outputFileName = `test.${fileType.ext}`
        fs.createWriteStream(outputFileName).write(buffer);
    } else {
        console.log('File type could not be reliably determined! The binary data may be malformed! No file saved!')
    };
};