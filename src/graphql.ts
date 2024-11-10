import { buildSchema } from 'type-graphql';
import express from 'express';
import { UserResolver } from './resolvers/userResolver';
import { AgreementResolver } from './resolvers/agreementResolver';
import { AgreementTypeResolver } from './resolvers/agreementTypeResolver';

export const createGraphQLSchema = () => {
  return buildSchema({
    resolvers: [UserResolver, AgreementResolver, AgreementTypeResolver],
  });
};

export type TGraphQLContext = {
  req: express.Request;
  res: express.Response;
};
