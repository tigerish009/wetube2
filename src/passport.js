import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userControllers";
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

passport.use(
    new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://localhost:4000${routes.facebookLoginCallback}`,
        profileFields: ["id", "displayName", "photos", "eamil"],
        scope: ["public_profile", "email"]
    },
    facebookLoginCallback
    )
);


passport.serializeUser(User.serializeUser()); //쿠키에 id를 담고
passport.deserializeUser(User.deserializeUser()); //어떤 id인지 알아낸다
// 대부분이 똑같이 사용하는 패턴임


