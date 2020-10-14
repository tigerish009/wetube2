import routes from "../routes";
import Video from "../models/Video";

// async는 멸령을 마칠때까지 기다려서 타이밍 맞춰줌
// 자바스크립트는 여러명령을 동시에 진행하고, 실행후 끝나지 않아도 다음으로 넘어감
// 그래서, 정의한 코드를 실행않고 다음으로 넘어가서 값이 없는것처럼 나옴
// 단, 에러발생시켜도 다음으로 넘어감. 정확한지는 판단안하고 명령이 끝난지만 봄
export const home = async (req, res) => {
    try {
        const videos = await Video.find({}); 
    // await는 명령이 끝날때까지 기다리란 의미 (await는 async와 세트)
    // Video.find({}) 하면 모든 비디오 가져옴
        res.render("home", {pageTitle : "Home", videos}); //pug 파일명인식
    } catch(error) {
        console.log(error);
        res.render("home", { pateTitle: "home", videos: []});
        // 에러발생하면 비디오에 빈 배열생성
    }
    // try & catch 는 에러판단없이 진행될때 알아채기 위해서 사용함
    // try는 에러없을때 시도할 내용
    // catch에서 에러발생시 콘솔표기해줌
}

export const search = (req, res) => {
    //const searchingBy = req.query.term;
    const {
        query: { term : searchingBy }
    } = req;
    res.render("search", {pageTitle : "Search", searchingBy, videos});
}

export const getUpload = (req, res) => res.render("upload", {pageTitle : "Upload"});
export const postUpload = (req, res) => {
    const {
        body : { file, title, description }
    } = req;
    // To Do : Upload and save video
    res.redirect(routes.videoDetail());
};
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "Delete Video"});