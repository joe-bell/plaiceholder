import React from "react";
import Head from "@docusaurus/Head";
import { useThemeConfig } from "@docusaurus/theme-common";
import { withUrl } from "../utils";
import { inject } from "@vercel/analytics";

function CustomRoot({ children }) {
  inject();

  const { metaTags } = useThemeConfig();

  const title = metaTags.find((item) => item.name === "data-title").content;

  return (
    <React.Fragment>
      <Head>
        <meta property="og:image" content={withUrl("/assets/img/og.png")} />

        <link rel="apple-touch-icon" href="/assets/img/favicon@192px.png" />
        <meta name="apple-mobile-web-app-title" content={title} />

        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "3faf15e4ce8d46cf9f7c55a06a6a3c5c"}'
        ></script>
      </Head>

      {children}
    </React.Fragment>
  );
}
export default CustomRoot;
