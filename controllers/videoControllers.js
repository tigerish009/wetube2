import routes from "../routes";
import Video from "../models/Video";

// async는 멸령을 마칠때까지 기다려서 타이밍 맞춰줌
// 자바스크립트는 여러명령을 동시에 진행하고, 실행후 끝나지 않아도 다음으로 넘어감
// 그래서, 정의한 코드를 실행않고 다음으로 넘어가서 값이 없는것처럼 나옴
// 단, 에러발생시켜도 다음으로 넘어감. 정확한지는 판단안하고 명령이 끝난지만 봄
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //홈화면 비디오 순서 역순으로 (업데이트순)
    // await는 명령이 끝날때까지 기다리란 의미 (await는 async와 세트)
    // Video.find({}) 하면 모든 비디오 가져옴
    res.render("home", { pageTitle: "Home", videos }); //pug 파일명인식
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "home", videos: [] });
    // 에러발생하면 비디오에 빈 배열생성
  }
  // try & catch 는 에러판단없이 진행될때 알아채기 위해서 사용함
  // try는 에러없을때 시도할 내용
  // catch에서 에러발생시 콘솔표기해줌
};

export const search = async (req, res) => {
  //const searchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id)); //324393 = 임시 ID
};
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await (await Video.findById(id)).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home); //잘못된 주소 입력되면 홈페이지로 이동시킴
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); // _id : id로 해줘야 제대로 id를 찾아서 수정함.
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
