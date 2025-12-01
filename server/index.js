import express from 'express';
import cors from 'cors';
import { readdirSync, unlinkSync } from 'node:fs';
import apiRouter from './routers/api.js';
import path from 'node:path';
const app = express();

for (const file of readdirSync('./')) {
    if (['.mp3', '.mp4', '.png'].includes(path.extname(file))) {
        unlinkSync(file)
    }
}

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({}))

app.use('/api', apiRouter)

app.listen(process.env.PORT || 3000);