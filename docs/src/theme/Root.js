import React from "react";
import { inject } from "@vercel/analytics";
import Head from "@docusaurus/Head";
import { useThemeConfig } from "@docusaurus/theme-common";
import { withUrl } from "../utils";

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
      </Head>

      {children}
    </React.Fragment>
  );
}
export default CustomRoot;
