const express = require("express");
const path = require("path");

const app = express();

// 미들웨어 : 모든 요청에서 미들웨어 실행
app.use((req, res, next) => {
  console.log("모든 요청에 응답함");
  next(); // 다음 미들웨어 실행을 위해서 반드시 필요
});

app.get(
  "/",
  (req, res, next) => {
    // 텍스트 화면 출력
    //res.send("Hello World");
    // res.sendFile(path.join(__dirname, "/index.html"));
    console.log("/ 의 GET 요청에 응답");
    next();
  },
  (req, res) => {
    throw new Error("에러 발생 시 에러 처리 미들웨어로 이동");
  }
);

app.get("/dog", function (req, res) {
  // 텍스트 화면 출력
  res.send("<h1>멍멍</h1>");
});

app.get("/cat", function (req, res) {
  // 텍스트 화면 출력
  res.send("<h1>야옹</h1>");
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3000);
