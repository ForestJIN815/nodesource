const path = require("path");
// 설치 모듈임 : npm i 필요
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
// 템플릿 엔진
const nunjucks = require("nunjucks");

// 라우터 파일 가져오기
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const aboutRouter = require("./routes/about");

// .env 파일 환경 가져오기
dotenv.config(); // env 에 저장한 값 불러오려면 process.env 하면 됨
const app = express();
const port = 3000;
app.set("port", process.env.PORT || port);

// view engine 설정
app.set("view engine", "njk"); // or html
nunjucks.configure("views", {
  express: app,
  watch: true, // 소스 변경되면 자동으로 템플릿 재 렌더링
});

// 미들웨어
app.use(morgan("tiny"));
// 정적 파일 경로
app.use("/", express.static(path.join(__dirname, "public")));
// 클라이언트가 보낸 데이터가 json 형태인 경우
app.use(express.json());
// 클라이언트가 보낸 데이터가 form 형태인 경우
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false, // 세션 수정 시 세션을 재저장 여부
    saveUninitialized: false, // 세션에 저장할 내용 없을 때 처음부터 세션 생성할 것인가?
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 세션쿠키 설정, https or http 환경에서 사용 여부
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든 요청에 응답함");
  next(); // 다음 미들웨어 실행을 위해서 반드시 필요
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);
// 없는 경로 요청 시 응답
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러처리 미들웨어 호출
});

// 에러처리 미들웨어 - 에러 발생 시 에러코드와 메세지 넘겨주기
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(500 || err.status);
  res.render("common/error");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
