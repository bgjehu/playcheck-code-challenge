// entry point import for type-graphql
import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { globalMiddlewares } from './middlewares';
import { baseResolvers } from './resolvers';
import { TournamentResolver } from './resolvers/TournamentResolver';

const schema = buildSchemaSync({
  resolvers: [
    TournamentResolver,
    ...baseResolvers,
  ],
  globalMiddlewares,
});

export default schema;