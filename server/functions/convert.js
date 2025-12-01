import Ffmpeg from "fluent-ffmpeg";
import { readFileSync, writeFileSync } from 'fs';

export async function convertData(
    fileName,
    fromFormat,
    toFormat,
    buffer
) {
    writeFileSync(`${fileName}.${fromFormat}`, buffer);

    await new Promise((resolve, reject) => {
        Ffmpeg(`${fileName}.${fromFormat}`)
            .toFormat(toFormat)
            .save(`${fileName}.${toFormat}`)
            .on('end', resolve)
            .on('error', reject)
    })

    return readFileSync(`${fileName}.${toFormat}`);
}