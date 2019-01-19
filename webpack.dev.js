const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
const baseConfig = require("./webpack.config");

// This allows up to fork the type-checking and now the loader
// only transpiles the code into javascript and the ForkTsCheckerWebpackPlugin
// handles all of the type checking
const newBaseConfig = baseConfig;
newBaseConfig.module.rules[0]["options"] = {
  transpileOnly: true
};

module.exports = {
  ...newBaseConfig,
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: {
      key: fs.readFileSync("certs/localhost.key"),
      cert: fs.readFileSync("certs/localhost.crt")
    },
    port: 9000
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "https://localhost:9000/"
  }
};
