const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

const publicDir = path.join(__dirname, "public");
const distDir = path.join(__dirname, "dist");

const defaultConfig = {
  mode: process.env.NODE_ENV || "development",
  devServer: {
    contentBase: publicDir,
    port: 9000
  },
  plugins: [new CopyPlugin([{ from: "public", to: "." }])].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(fetch-inject|another-es6-module)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            compact: false
          }
        }
      },
      { test: /\.html$/i, use: "html-loader" },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};

module.exports = [
  {
    ...defaultConfig,
    entry: "./src/widget-starter/index.js",
    output: {
      path: distDir,
      publicPath: "/",
      filename: "widget-starter.js",
      library: "mapWidgetStarter",
      libraryExport: "default",
      libraryTarget: "umd",
      umdNamedDefine: true
    }
  }
];
