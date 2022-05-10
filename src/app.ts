import * as express from 'express';
import { authenticationCheck } from './middlewares/auth/authenticationCheck';
import { authorizationCheck } from './middlewares/auth/authorizationCheck';
import { graphiql } from './middlewares/graphiql';
import { graphqlMiddleware } from './middlewares/graphql';
import { storeUser } from './middlewares/StoreUser';

const app = express();

// openid connect endpoints and middlewares
// help to login/logout user, and get ID and access token
app.use(authenticationCheck());

// web page show log in status
app.get('/', storeUser(), (req: express.Request, res: express.Response) => {
  res.send(`Logged ${req.oidc.isAuthenticated() ? 'In' : 'Out'}`);
});

// web app render graphiql with capability to add access token
app.get('/graphiql', (req: express.Request, res: express.Response, next) => {
  req.oidc.isAuthenticated() ? next() : res.redirect('/login');
}, graphiql());

// guard graphql endpoint with authorization check of access token
app.post('/graphiql', (req, res, next) => {
  next();
}, authorizationCheck(), graphqlMiddleware());

export default app;