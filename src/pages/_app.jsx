"use client";

import { Provider } from "jotai";
import "@/styles/globals.css";
import { appStore } from "@/store/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import MainComponent from "@/components/mainComponent";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthGuard from "@/components/AuthGuard";

function MyApp({ Component, pageProps }) {

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <Provider store={appStore}>
        <AuthGuard>
          <MainComponent Component={Component} pageProps={pageProps} />
        </AuthGuard>
      </Provider>
    </Auth0Provider>

  );
}

export default MyApp;
