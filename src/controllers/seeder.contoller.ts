import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils";
import dummyData from "../utils/dummyData";
import User from "../models/user.model";
import Category from "../models/category.model";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

const seederController = {
  createUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.deleteMany({});

      dummyData.users.forEach(async (user) => {
        await User.create({
          username: user.username,
          email: user.email,
          password: await hashPassword(user.password),
          role: user.role || undefined,
        });
      });

      return res.json("Fake users created");
    } catch (err) {
      next(err);
    }
  },

  createCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Category.deleteMany({});

      dummyData.categories.forEach(async (category) => {
        await Category.create({
          _id: category.id,
          name: category.name,
        });
      });

      return res.json("Fake categories created");
    } catch (err) {
      next(err);
    }
  },

  createPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Post.deleteMany({});

      dummyData.posts.forEach(async (post) => {
        await Post.create({
          _id: post._id,
          title: post.title,
          type: post.type || undefined,
          content: post.content,
          category: post.category,
          author: req.user,
          tags: post.tags || undefined,
          status: post.status,
        });
      });

      return res.json("Fake posts created");
    } catch (err) {
      next(err);
    }
  },

  createComments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Comment.deleteMany({});

      dummyData.comments.forEach(async (comment) => {
        await Comment.create({
          authorName: comment.authorName,
          authorEmail: comment.authorEmail,
          content: comment.content,
          post: comment.post,
        });
      });

      return res.json("Fake comments created");
    } catch (err) {
      next(err);
    }
  },
};

export default seederController;
