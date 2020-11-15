import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);
//미들웨어는 정보를 다음으로 넘겨준다
//postJoin에서 username,password받아서 가입시키고, postLogin으로 넘겨준다

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin)

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;