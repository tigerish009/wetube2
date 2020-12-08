"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoControllers = require("../controllers/videoControllers");

var _routes = _interopRequireDefault(require("../routes"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router(); //Upload


videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoControllers.getUpload);
videoRouter.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoControllers.postUpload); //Video Detail

videoRouter.get(_routes["default"].videoDetail(), _videoControllers.videoDetail); //Edit Video

videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.getEditVideo);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.postEditVideo); //Delete Video

videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoControllers.deleteVideo); //String을 return하는 함수이기 때문에 () 붙여줘야함

var _default = videoRouter;
exports["default"] = _default;