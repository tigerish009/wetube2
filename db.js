import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/wetube2", 
{ //몽고디비 설정 바로 할 수 있음
    useNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);