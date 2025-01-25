// utils/auth0.js
import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "openid profile email",
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  authorizationParams: {
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8, // 8 hours
  },
  idTokenSigningAlg: "RS256"
});
