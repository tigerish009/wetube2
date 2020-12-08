"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoControllers = require("../controllers/videoControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].registerView, _videoControllers.postRegisterView);
apiRouter.post(_routes["default"].addComment, _videoControllers.postAddComment);
var _default = apiRouter;
exports["default"] = _default;