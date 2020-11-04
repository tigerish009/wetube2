//babel 쓸수없고 일반자바스크립트 써야함. 따라서 export default 등 사용 못함.
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  //entry는 파일이 어디에서 왔는가? output은 파일을 어디넣을것인가?
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
      rules: [
          {
              test: /\.(js)$/,
              use: {
                  loader: "babel-loader"
              }
          },
      
          {
              test: /\.(scss)$/, //확장자 찾기
              use: [
                MiniCssExtractPlugin.loader,
                { loader : "css-loader" },
                { loader : "postcss-loader" },
                { loader : "sass-loader" }
              ],//웨팩은 아래에서 위로 실행됨 sass-loader -> postcss-loadeer ....
          },
      ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  stats: {
    entrypoints: false,
    children: false
  },
  plugins: [ new MiniCssExtractPlugin({
    filename: "styles.css" 
    }) 
  ]
//   플러그인을 설치해줘야 위에서 사용가능함 (extract-text-webpack-plugin)
//   styles.css 는 저장할 파일이름 정한것]
};

module.exports = config;
