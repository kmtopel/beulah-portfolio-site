const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const shouldExport = isGitHubActions || process.env.NEXT_OUTPUT_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(shouldExport ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  ...(isGitHubActions && repoName
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`
      }
    : {})
};

export default nextConfig;
