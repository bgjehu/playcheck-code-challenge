import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { API_HOST } from '../../env';

const graphiqlHtml = readFileSync(__dirname + '/graphiql.html', { encoding: 'utf8' }).replace('${{API_HOST}}', API_HOST);

export const graphiql = () => (req: Request, res: Response) => {
  res.send(graphiqlHtml.replace('${{ACCESS_TOKEN}}', req.oidc.accessToken?.access_token));
};