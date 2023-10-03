const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("node:path");

module.exports = {
  mode: process.env["NODE_ENV"],
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/TLDraw-folder/index.html", // to import index.html file inside index.js
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/icons", to: "icons" },
        { from: "src/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
