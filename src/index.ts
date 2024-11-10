import 'reflect-metadata';
import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { db } from './db';
import { createApolloServer } from './apollo';
import { NODE_ENV } from './env';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress';

(async () => {
  const app = express();
  const port = 3000;
  const apollo = await createApolloServer();

  if (NODE_ENV !== 'production') {
    app.use(cors());
  }

  app.use(json({ limit: '500kb' }));
  // app.use(graphqlUploadExpress());

  await db.initialize();
  apollo.applyMiddleware({ app, path: '/' });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
