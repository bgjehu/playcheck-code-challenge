import { Request, Response } from "express";
import { graphqlHTTP, GraphQLParams } from "express-graphql";
import schema from "../graphql/schema";
import { UserModel } from "../models";

export const graphqlMiddleware = () => graphqlHTTP(async (
  req: Request & { auth: { sub: string } },
  res: Response,
  graphQLParams: GraphQLParams) => {
  // get user and inject into graphql context
  const user = await UserModel.findOne({ sub: req.auth.sub });
  return {
    schema,
    context: { user },
    graphiql: false,
  }
})