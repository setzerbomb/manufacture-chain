import PostProcessing from '@modules/supply-chain/model/entities/PostProcessing';
import PostProcessingService from '@modules/supply-chain/model/services/PostProcessingService';

import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

const PostProcessingController = () => {
  const self = {
    get: async (req: Request, res: Response) => {
      const postProcessingService = container.resolve(PostProcessingService);

      const id = Number(req.params?.id);

      return res.json(await postProcessingService.get(id));
    },
    create: async (req: Request, res: Response) => {
      const postProcessingService = container.resolve(PostProcessingService);

      const id = Number(req.params?.id);
      const postProcessing: PostProcessing = req.body;

      await postProcessingService.create(id, postProcessing);

      return res.status(201).send();
    },
  };

  return self;
};

export default PostProcessingController();
