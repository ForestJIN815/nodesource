var mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User", // User 스키마 사용자의 ObjectId가 삽입됨
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
