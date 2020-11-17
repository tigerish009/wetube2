import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"});
};
        // To Do : Register User
export const postJoin = async (req, res, next) => {
    const {
        body : { name, email, password, password2}
    } = req;
    if(password !== password2) {
        res.status(400);
        res.render("join", {pageTitle : "Join"});
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next(); //미들웨어 호출하니까 next()해줘야함.
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }        
    }
};

export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});

// To Do : Log user in
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

// 사용자를 깃헙에 보냄
export const githubLogin = passport.authenticate('github');


// 깃헙에 간 사용자를 인증성공 후 다시 불러옴
export const githubLoginCallback = async (_, __, profile, cb) => {
    const { 
        _json: { id, avatar_url, name, email}
    } = profile;
    try {
        const user = await User.findOne({ email }); // email이 일치하는지 확인 후 유저로 판단
        if(user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } 
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url
        });
        return cb(null, newUser);
    } catch(error) {
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    //To Do : Process Log Out
    req.logout();
    res.redirect(routes.home);
}


export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});
