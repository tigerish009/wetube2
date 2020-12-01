import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    //방법1 (댓글과 비디오의 아이디를 매치시켜서 연결)
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Video" 
    //     //Video.js의 mongoose.model("Video", VideoSchema); 임.
    // }
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
})

const model = mongoose.model("Comment", CommentSchema);
export default model;