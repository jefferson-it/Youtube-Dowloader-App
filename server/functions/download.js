import youtubeDl from "youtube-dl-exec"

export async function getInfoVideo(url) {
    const info = await youtubeDl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        preferFreeFormats: true,
    });

    return info;
}

export function downloadMp3(url) {
    try {
        const resultListener = youtubeDl.exec(url, {
            extractAudio: true,
            audioFormat: 'mp3',
            format: 'bestaudio',
            output: '-'
        })

        const chunks = [];

        return new Promise((resolve, reject) => {
            resultListener.stdout.on('data', (chunk) => {
                chunks.push(chunk)
            });

            resultListener.on('close', (code) => {
                console.log('Download completo: ', code);


                if (code === 0) {
                    resolve(Buffer.concat(chunks))
                } else {
                    reject(new Error('Falhou com erro ', code))
                }
            })

            resultListener.on('error', reject);
        })


    } catch (error) {
        return undefined
    }
}

export function downloadMp4(url) {
    try {
        const resultListener = youtubeDl.exec(url, {
            output: '-',
        })

        const chunks = [];


        return new Promise((resolve, reject) => {
            resultListener.stdout.on('data', (chunk) => {
                chunks.push(chunk)
            });

            resultListener.on('close', (code) => {
                console.log('Download completo: ', code);

                if (code === 0) {
                    resolve(Buffer.concat(chunks))
                } else {
                    reject(new Error('Falhou com erro ', code))
                }
            })

            resultListener.on('error', reject);
        })
    } catch (error) {
        return undefined
    }
}