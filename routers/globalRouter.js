import express from "express";
import passport from "passport";
import { getJoin, postJoin, getLogin, postLogin, logout, githubLoginCallback, githubLogin, postGithubLogIn, getMe, postFacebookLogin, facebookLogin } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
//미들웨어는 정보를 다음으로 넘겨준다
//postJoin에서 username,password받아서 가입시키고, postLogin으로 넘겨준다

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate('github', { failureRedirect: "/login" }),
    postGithubLogIn
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    postFacebookLogin
);

export default globalRouter;