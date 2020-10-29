//babel 쓸수없고 일반자바스크립트 써야함. 따라서 export default 등 사용 못함.
const path = require("path");
const autoprefixer = require("autoprefixer");
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
        test: /\.(scss)$/, //확장자 찾기
        use: ExtractCSS.extract([ //scss를 css로 변환시키는 플러그인
          {
            loader: "css-loader", //마지막으로 웹팩이 css를 이해하도록 함
          },
          {
            loader: "postcss-loader", // css를 받아서 플러그인으로 css변환
            // 자동으로 웹킷, 파폭 웹브라우저에서 인식하도록 변경해줌
            options: {
                plugin() {
                    return [autoprefixer({ browsers: "cover 99.5% "})];
                }
            }
          },
          {
            loader: "sass-loader", //scss를 받아서 css로 바꿔줌
          },
        ]),//웨팩은 아래에서 위로 실행됨 sass-loader -> postcss-loadeer ....
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [ new ExtractCSS("styles.css") ]
//   플러그인을 설치해줘야 위에서 사용가능함 (extract-text-webpack-plugin)
//   styles.css 는 저장할 파일이름 정한것]
};

module.export = config;
