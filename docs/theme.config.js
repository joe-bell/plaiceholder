const { asset, isProduction } = require("./utils/nextra");

const title = "Plaiceholder: Docs";
const description = "Documentation for Plaiceholder.co";
const repo = "https://github.com/joe-bell/plaiceholder";

const year = new Date().getFullYear();

export default {
  repository: repo,
  docsRepository: repo,
  branch: "main",
  path: "/docs",
  titleSuffix: ` | ${title}`,
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: true,
  footer: true,
  footerText: `Apache-2.0 ${year} © Joe Bell`,
  footerEditOnGitHubLink: true,
  logo: (
    <>
      <span className="mr-2 text-xl font-500 md:inline">plaiceholder</span>
      <span className="mr-2 md:inline hidden">
        <img
          style={{ width: "2.5rem" }}
          src={asset("/assets/images/logo/logo@192px.png")}
          alt=""
        />
      </span>
      <span className="text-gray-600  text-xl  md:inline">Docs</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />

      <link
        rel="shortcut icon"
        href={asset("/assets/images/favicon/favicon@192px.png")}
      />
      <link
        rel="apple-touch-icon"
        href={asset("/assets/images/favicon/favicon@192px.png")}
      />
      <meta name="apple-mobile-web-app-title" content={title} />

      <link rel="manifest" href={asset("/manifest.webmanifest")} />

      {isProduction && (
        <script
          async
          defer
          data-domain={process.env.SITE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
        />
      )}
    </>
  ),
};
