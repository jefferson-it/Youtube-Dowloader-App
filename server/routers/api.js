import { Router } from 'express';
import ytRouter from './yt.js';

const apiRouter = Router();

apiRouter.use('/yt', ytRouter)

export default apiRouter;