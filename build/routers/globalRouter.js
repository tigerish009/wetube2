"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _userControllers = require("../controllers/userControllers");

var _videoControllers = require("../controllers/videoControllers");

var _middlewares = require("../middlewares");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userControllers.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userControllers.postJoin, _userControllers.postLogin); //미들웨어는 정보를 다음으로 넘겨준다
//postJoin에서 username,password받아서 가입시키고, postLogin으로 넘겨준다

globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userControllers.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userControllers.postLogin);
globalRouter.get(_routes["default"].home, _videoControllers.home);
globalRouter.get(_routes["default"].search, _videoControllers.search);
globalRouter.get(_routes["default"].logout, _userControllers.logout);
globalRouter.get(_routes["default"].gitHub, _userControllers.githubLogin);
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate('github', {
  failureRedirect: "/login"
}), _userControllers.postGithubLogIn);
globalRouter.get(_routes["default"].me, _userControllers.getMe);
globalRouter.get(_routes["default"].facebook, _userControllers.facebookLogin);
globalRouter.get(_routes["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: "/login"
}), _userControllers.postFacebookLogin);
var _default = globalRouter;
exports["default"] = _default;