"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  //방법1 (댓글과 비디오의 아이디를 매치시켜서 연결)
  // video: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Video" 
  //     //Video.js의 mongoose.model("Video", VideoSchema); 임.
  // }
  creater: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var model = _mongoose["default"].model("Comment", CommentSchema);

var _default = model;
exports["default"] = _default;