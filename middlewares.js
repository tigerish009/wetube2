import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest : "upload/videos/"});
// /uploads/videos/ 처럼 앞에 슬래쉬를 붙이면 root에 upload 만듦

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: false,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");
// multer middleware