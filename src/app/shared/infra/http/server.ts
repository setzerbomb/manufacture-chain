import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';

import '@shared/container';
import AppError from '@shared/errors/AppError';

import message from '@shared/functions/message';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return message(response, err.status, err.message);
    }
    console.log(err);

    return message(response, 500, 'Internal Server Error');
  },
);

app.listen(3333);
