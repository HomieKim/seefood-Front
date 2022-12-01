/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["seefood-deploy.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // config.module.rules.push({
    //   test: /\.(eot|woff|woff2|ttf)$/,
    //   use: {
    //     loader: "url-loader",
    //     options: {
    //       limit: 100000,
    //       name: "[name].[ext]",
    //     },
    //   },
    // });
    return config;
  },
};

module.exports = nextConfig;
