import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
   {
      authorName: {
         type: String,
         required: true,
      },
      authorEmail: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      post: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post",
         required: true,
      },
      status: {
         type: String,
         enum: ["approved", "not_approved"],
         default: "not_approved",
      },
   },
   {
      timestamps: true,
   }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
