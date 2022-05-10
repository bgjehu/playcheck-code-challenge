import { auth } from "express-openid-connect";
import { CLIENT_ID, CLIENT_SECRET, ISSUER_URL, API_HOST, OIDC_ENCRYTION_SECRET, WEB_APP_HOST } from "../../env";

// https://auth0.github.io/express-openid-connect/interfaces/configparams.html
export const authenticationCheck = () => auth({
  authRequired: false,
  idpLogout: true,
  secret: OIDC_ENCRYTION_SECRET,
  baseURL: WEB_APP_HOST,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  issuerBaseURL: ISSUER_URL,
  routes: {
    postLogoutRedirect: '/',
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email Game::Get Region::Get Token::Get Tournament::Create Tournament::Join Tournament::Update',
    audience: API_HOST,
  },
})