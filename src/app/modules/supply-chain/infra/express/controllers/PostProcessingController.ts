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

      if (
        (await postProcessingService.get(id)).length ===
        (await qualityCheckService.get(id)).length
      ) {
        await postProcessingService.create(id, postProcessing);

        return res.status(201).send();
      } else {
        return res.status(500).json({
          message:
            'You have to add a quality check to previous post process before adding more',
        });
      }
    },
  };

  return self;
};

export default PostProcessingController();
