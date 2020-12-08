"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _userControllers = require("./controllers/userControllers");

var _User = _interopRequireDefault(require("./models/User"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userControllers.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].facebookLoginCallback),
  profileFields: ["id", "displayName", "photos", "eamil"],
  scope: ["public_profile", "email"]
}, _userControllers.facebookLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser()); //쿠키에 id를 담고


_passport["default"].deserializeUser(_User["default"].deserializeUser()); //어떤 id인지 알아낸다
// 대부분이 똑같이 사용하는 패턴임