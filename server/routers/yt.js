import { Router } from 'express';
import { searchOnYoutube } from '../functions/search.js';
import { downloadMp3, downloadMp4, getInfoVideo } from '../functions/download.js';
import { convertData } from '../functions/convert.js';
import { unlinkSync } from 'fs';
import axios from 'axios';

const ytRouter = Router();
function sanitizeFilename(name) {
    return name
        .normalize("NFKD") // normaliza acentos
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^\x20-\x7E]/g, "") // remove emojis e caracteres não ASCII
        .replace(/[\/\\?%*:|"<>]/g, '-') // remove inválidos de filesystem
        .replace(/[\u2014\u2013]/g, '-') // substitui — e – por -
        .replace(/\|/g, '-') // remove barra vertical
        .replace(/\s+/g, ' ') // normaliza espaços
        .trim();
}

ytRouter.get('/', async (req, res) => {
    const { q, p } = req.query;

    const result = await searchOnYoutube(q, p || 0);

    res.json(result);
})


ytRouter.get('/mp3', async (req, res) => {
    const { url, id } = req.query;
    try {


        if (!url && !id) return res.json({
            message: 'ID e URL em falta'
        })
        const uri = id ? `https://www.youtube.com/watch?v=${id}` : url;

        const buffer = await downloadMp3(uri);
        const info = await getInfoVideo(uri)

        const date = Date.now();
        const filename = `./${info.title}-${date}`;
        const finalBuffer = await convertData(filename, 'webm', 'mp3', buffer)


        unlinkSync(`./${info.title}-${date}.webm`)
        unlinkSync(`./${info.title}-${date}.mp3`)
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': `attachment; filename="${sanitizeFilename(info.title)}.mp3"`
        });

        res.send(finalBuffer)
    } catch (error) {
        res.json({ message: 'Ocorreu um erro' })
    }

})

ytRouter.get('/mp4', async (req, res) => {
    const { url, id } = req.query;

    try {

        if (!url && !id) return res.json({
            message: 'ID e URL em falta'
        })

        const uri = id ? `https://www.youtube.com/watch?v=${id}` : url;

        const buffer = await downloadMp4(uri);
        const info = await getInfoVideo(uri)
        const date = Date.now();
        const filename = `./${info.title}-${date}`;
        const finalBuffer = await convertData(filename, 'webm', 'mp4', buffer)

        unlinkSync(`./${info.title}-${date}.webm`)
        unlinkSync(`./${info.title}-${date}.mp4`)

        res.set({
            'Content-Type': 'video/mp4',
            'Content-Disposition': `attachment; filename="${sanitizeFilename(info.title)}.mp4"`
        });

        res.send(finalBuffer)
    } catch (error) {
        res.json({ message: 'Ocorreu um erro' })
    }

})

ytRouter.get('/thumbnail', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'ID em falta' });
        }

        // URL da thumbnail
        const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

        // Baixa como arraybuffer
        const response = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });

        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Disposition': `attachment; filename="${sanitizeFilename(id)}.jpg"`
        });

        res.send(response.data);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro ao baixar thumbnail' });
    }
});

export default ytRouter;