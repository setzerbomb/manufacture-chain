import PostProcessing from '@modules/supply-chain/model/entities/PostProcessing';
import PostProcessingService from '@modules/supply-chain/model/services/PostProcessingService';
import QualityCheckService from '@modules/supply-chain/model/services/QualityCheckService';

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
      const qualityCheckService = container.resolve(QualityCheckService);

      const id = Number(req.params?.id);
      const postProcessing: PostProcessing = req.body;

      await postProcessingService.create(id, postProcessing);

      if (
        (await postProcessingService.get(id)).length ===
        (await qualityCheckService.get(id)).length
      ) {
        await qualityCheckService.create(id, postProcessing);

        return res.status(201).send();
      }
      return res.status(500).json({
        message: 'Each quality check should be associated with a post process',
      });
    },
  };

  return self;
};

export default PostProcessingController();
