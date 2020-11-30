import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest : "uploads/videos/"});
// /uploads/videos/ 처럼 앞에 슬래쉬를 붙이면 root에 upload 만듦
const multerAvatar = multer({dest : "uploads/avatars/"});

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (req,user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");
// multer middleware
export const uploadAvatar = multerAvatar.single("avatar");