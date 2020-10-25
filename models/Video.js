import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required" //required가 충족되지못하면 나오는 메시지 설정
    },
    title : {
        type: String,
        required: "Title is required"
    },
    description: String,
    views : {
        type: Number,
        default: 0
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    // 방법2 비디오모델에 코멘트배열 추가하여 각자 ID매칭시키고 연결하기
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const model = mongoose.model("Video", VideoSchema);
//model변수에 몽구스모델합수를 호출하고 이름은 Video로 정하고 VideoSchema호출함.
export default model;