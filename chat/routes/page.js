const express = require("express");
const {
  renderMain,
  enterRoom,
  createRoom,
  sendChat,
  sendImg,
} = require("../controllers/page");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/", renderMain);
router.get("/room/:id", enterRoom);

router.get("/room", renderMain);
router.post("/room", createRoom);

// 채팅메세지
router.post("/room/:id/chat", sendChat);

// 이미지 저장 폴더 설정 및 저장
// 내부 경로는 uploads 폴더 사용

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("uploads 가 없는 경우 폴더 생성");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      // poster.png
      const ext = path.extname(file.originalname); // 확장자 분리
      // 파일명+현재시간.확장자
      // poster1735413664541.png
      done(null, path.basename("" + file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
// 채팅이미지
router.post("/room/:id/img", upload.single("img"), sendImg);

module.exports = router;
