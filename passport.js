import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userControllers";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback)
);

passport.serializeUser(User.serializeUser()); //쿠키에 id를 담고
passport.deserializeUser(User.deserializeUser()); //어떤 id인지 알아낸다
// 대부분이 똑같이 사용하는 패턴임


