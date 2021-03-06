"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VideoSchema = new _mongoose["default"].Schema({
  fileUrl: {
    type: String,
    required: "File URL is required" //required가 충족되지못하면 나오는 메시지 설정

  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  // 방법2 비디오모델에 코멘트배열 추가하여 각자 ID매칭시키고 연결하기
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  creater: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var model = _mongoose["default"].model("Video", VideoSchema); //model변수에 몽구스모델합수를 호출하고 이름은 Video로 정하고 VideoSchema호출함.


var _default = model;
exports["default"] = _default;