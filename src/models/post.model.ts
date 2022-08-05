import mongoose from "mongoose";
// @ts-ignore
import mongooseSlugPlugin from "mongoose-slug-plugin";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "https://via.placeholder.com/800",
        publicId: null,
      },
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
      enum: ["post", "survey", "ad"],
      default: "post",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });

const Post = mongoose.model("Post", PostSchema);

export default Post;
