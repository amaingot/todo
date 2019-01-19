const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json"]
  }
};
