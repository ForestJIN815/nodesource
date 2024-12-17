var express = require("express");
var User = require("../schemas/user");
const Comment = require("../schemas/comment");

const router = express.Router();

router
  .route("/") // /users
  .get(async (req, res, next) => {
    try {
      // db.users.find({})
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      // db.movies.insertOne({name:'홍길동',age:15, married:true})
      // req.body : form 안에 내용 가져올 수 있음
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log("user 삽입 결과 ", user);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

// 특정 user가 작성한 전체 comment 가져오기
// users/675b9719c404ebe50405c549/comment
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      "commenter"
    );
    res.json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
