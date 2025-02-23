const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
