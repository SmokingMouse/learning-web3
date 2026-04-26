/** @type {import('next').NextConfig} */

// GitHub Actions 部署 GH Pages 时会设置 GITHUB_ACTIONS=true，自动加路径前缀；
// Vercel / 本地开发不设置此变量，basePath 为空，互不影响。
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = "learning-web3";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGithubActions ? `/${repo}` : "",
  assetPrefix: isGithubActions ? `/${repo}/` : "",
};

export default nextConfig;
