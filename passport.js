import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); //쿠키에 id를 담고
passport.deserializeUser(User.deserializeUser()); //어떤 id인지 알아낸다
// 대부분이 똑같이 사용하는 패턴임


