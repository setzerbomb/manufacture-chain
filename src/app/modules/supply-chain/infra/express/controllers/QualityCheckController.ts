import QualityCheck from '@modules/supply-chain/model/entities/QualityCheck';
import PostProcessingService from '@modules/supply-chain/model/services/PostProcessingService';
import QualityCheckService from '@modules/supply-chain/model/services/QualityCheckService';

import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

const QualityCheckController = () => {
  const self = {
    get: async (req: Request, res: Response) => {
      const qualityCheckService = container.resolve(QualityCheckService);

      const id = Number(req.params?.id);

      return res.json(await qualityCheckService.get(id));
    },
    create: async (req: Request, res: Response) => {
      const qualityCheckService = container.resolve(QualityCheckService);
      const postProcessingService = container.resolve(PostProcessingService);

      const id = Number(req.params?.id);
      const qualityCheck: QualityCheck = req.body;

      if (
        (await postProcessingService.get(id)).length >
        (await qualityCheckService.get(id)).length
      ) {
        await qualityCheckService.create(id, qualityCheck);

        return res.status(201).send();
      }
      return res.status(500).json({
        message: 'Each quality check should be associated with a post process',
      });
    },
  };

  return self;
};

export default QualityCheckController();
