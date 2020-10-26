//babel 쓸수없고 일반자바스크립트 써야함. 따라서 export default 등 사용 못함.
const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  //entry는 파일이 어디에서 왔는가? output은 파일을 어디넣을것인가?
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rule: [
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.export = config;
