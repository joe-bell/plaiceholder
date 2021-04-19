import * as React from "react";
import NextHead from "next/head";
import { config } from "@/config";

export const Head: React.FC = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="robots" content="noindex" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={config.title} />
    <meta name="og:title" content={config.title} />

    <link
      rel="shortcut icon"
      href={[config.domain, "assets/images/favicon/favicon@192px.png"].join(
        "/"
      )}
    />
    <link
      rel="apple-touch-icon"
      href={[config.domain, "assets/images/favicon/favicon@192px.png"].join(
        "/"
      )}
    />
    <meta name="apple-mobile-web-app-title" content={config.title} />

    <title>Plaiceholder × Next.js</title>
  </NextHead>
);
