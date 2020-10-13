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
    view : {
        type: Number,
        default: 0
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model("Video", VideoSchema);
//model변수에 몽구스모델합수를 호출하고 이름은 Video로 정하고 VideoSchema호출함.
export default model;