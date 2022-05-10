import { expressjwt, GetVerificationKey } from 'express-jwt';
import * as jwks from 'jwks-rsa';
import { API_HOST, ISSUER_URL, OAUTH_JWKS_URI } from '../../env';

export const authorizationCheck = () => expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: OAUTH_JWKS_URI,
  }) as GetVerificationKey,
  audience: API_HOST,
  issuer: ISSUER_URL,
  algorithms: ['RS256']
});