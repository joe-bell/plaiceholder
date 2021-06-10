import React from "react";
import Head from "@docusaurus/Head";
import { useThemeConfig } from "@docusaurus/theme-common";
import { domain, isProduction, withUrl } from "../utils";

function CustomRoot({ children }) {
  const { metaTags } = useThemeConfig();

  const title = metaTags.find((item) => item.name === "data-title").content;

  return (
    <React.Fragment>
      <Head>
        <meta
          property="og:image"
          content={withUrl("assets/images/og/og.png")}
        />

        <link
          rel="apple-touch-icon"
          href={withUrl("/assets/images/favicon/favicon@192px.png")}
        />
        <meta name="apple-mobile-web-app-title" content={title} />

        {isProduction && (
          <script
            async
            defer
            data-domain={domain}
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </Head>

      {children}
    </React.Fragment>
  );
}
export default CustomRoot;
