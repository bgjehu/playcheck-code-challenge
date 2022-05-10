import { config } from 'dotenv';
config({ path: `${__dirname}/.env` });

import { Server } from 'http';
import mongoose from 'mongoose';
import * as newman from 'newman'
import jwtDecode from 'jwt-decode'
import { promisify } from 'util';
import app from '../../src/app';
import { MONGO_DB_URL, SERVER_PORT } from '../../src/env';
import { graphqlMiddleware } from '../../src/middlewares/graphql';
import { Request, Response } from 'express';

const runCollection = promisify(newman.run);

(async () => {
  // wait for db connection before starting the server
  await mongoose.connect(MONGO_DB_URL);

  app.post('/graphql', (req: Request & { auth: { sub: string } }, res: Response, next) => {
    req.auth = jwtDecode(req.headers.authorization);
    next();
  }, graphqlMiddleware());

  await new Promise<Server>(resolve => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server Listening on http://localhost:${SERVER_PORT}`);
      resolve(null);
    });
  });

  await runCollection({
    collection: require('./collections/PlayCheck.postman_collection.json'),
    reporters: 'cli',
    environment: require('./stages/test.postman_environment.json'),
  });

  process.exit(0);
})();