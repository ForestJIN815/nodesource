var mongoose = require("mongoose");

// 몽고디비와 연결하는 모듈

//개발 시 모든 로그는 debug 모드로 작성
const conn = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  //Set up default mongoose connection
  var mongoDB = "mongodb://root:12345@127.0.0.1:27017/admin";
  mongoose
    .connect(mongoDB, { dbName: "nodejs" })
    .then(() => console.log("몽고디비 연결 성공"))
    .catch((err) => console.log("몽고디비 연결 실패", err));
};

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "몽고 디비 연결 에러"));
db.on(
  "disconnected",
  console.error.bind(console, "몽고 디비 연결이 끊겼습니다. 연결 재시도")
);

module.exports = conn;
