export default {
  repository: "https://github.com/joe-bell/plaiceholder",
  docsRepository: "https://github.com/joe-bell/plaiceholder",
  branch: "main",
  path: "/docs",
  titleSuffix: " – Plaiceholder Docs",
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: true,
  footer: true,
  footerText: "MIT 2021 © Joe Bell.",
  footerEditOnGitHubLink: true,
  logo: (
    <>
      <span className="mr-2 text-xl font-semibold md:inline">plaiceholder</span>
      <span className="mr-2 md:inline hidden">
        <img
          style={{ width: "2.5rem" }}
          src="/docs/assets/images/logo@192px.png"
          alt=""
        />
      </span>
      <span className="text-gray-600  text-xl  md:inline">Docs</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Documentation for Plaiceholder.co" />
      <meta name="og:title" content="Plaiceholder: Docs" />
    </>
  ),
};
