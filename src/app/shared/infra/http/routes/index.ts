import { Router } from 'express';

import partsRouter from './app/parts.routes';
import postProcessingRouter from './app/post-processing.routes';
import qualityCheckRouter from './app/quality-check.routes';

const routes = Router();

routes.use('/parts', partsRouter);

routes.use('/postProcessing', postProcessingRouter);

routes.use('/qualityCheck', qualityCheckRouter);

export default routes;
