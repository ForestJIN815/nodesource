// 외부(설치된) 모듈 불러오기
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const ColorHash = require("color-hash").default;

// 내부 모듈 불러오기
const pageRouter = require("./routes/page");
const connect = require("./schema/connect");

// env 파일 읽기
dotenv.config();

const app = express();

// 소켓 연동
const webSocket = require("./socket");

// 웹서버 설정
const port = 8005;
app.set("port", process.env.PORT || port);
// 템플릿 설정
app.set("view engine", "njk");

// nunjucks 세팅
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 데이터베이스 연결
connect();

// 미들웨어 연결
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); //static 파일 경로
app.use("/img", express.static(path.join(__dirname, "uploads"))); //업로드 파일 경로
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionMidddleWare = session({
  resave: false, // 세션 수정 시 세션을 재저장 여부
  saveUninitialized: false, // 세션에 저장할 내용 없을 때 처음부터 세션 생성할 것인가?
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // 세션쿠키 설정, https or http 환경에서 사용 여부
    secure: false,
  },
});

app.use(sessionMidddleWare);

app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHahs = new ColorHash();
    req.session.color = colorHahs.hex(req.sessionID);
    console.log("색상 ", req.session.color, req.sessionID);
  }
  next();
});

app.use("/", pageRouter);

// 404 오류
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

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
webSocket(server, app, sessionMidddleWare);
