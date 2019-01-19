const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.config");

const S3_BUCKET_URL = "https://todo.maingot.us";
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || "production";

const ASSET_PATH = `${S3_BUCKET_URL}${CIRCLE_BRANCH}/`;

module.exports = {
  ...baseConfig,
  mode: "production",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.CIRCLE_BRANCH": JSON.stringify(CIRCLE_BRANCH),
      "process.env.S3_BUCKET_URL": JSON.stringify(S3_BUCKET_URL)
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: ASSET_PATH
  }
};
