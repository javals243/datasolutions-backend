import { NextFunction, Request, Response } from "express";
import { _cloudinary } from "../config";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

const postController = {
  // get all posts
  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.query;

      if (type) {
        const posts = await Post.find({ type })
          .populate("author", "-password")
          .populate("category")
          .sort({ createdAt: "desc" });

        return res.json(posts);
      }

      const posts = await Post.find({})
        .populate("author", "-password")
        .populate("category")
        .sort({ createdAt: "desc" });

      return res.json(posts);
    } catch (err) {
      next(err);
    }
  },

  // get paginated posts
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // pagination stuff
      const page = Number(req.query.page) * 1 || 1;
      const limit = Number(req.query.limit) * 1 || 10;
      const skip = (page - 1) * limit;

      // get the keyword
      const keyword = req.query.keyword ? req.query.keyword : "";

      // get the post type
      const postType = req.query.type ? req.query.type : "post";

      // aggregate posts to get all posts with thier comments count
      const posts = await Post.aggregate([
        { $match: { $and: [{ type: postType }, { status: "published" }] } },
        { $match: { title: { $regex: keyword, $options: "i" } } },
        {
          $lookup: {
            from: "comments",
            let: { post: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$post", "$post"] } } },
              { $match: { status: "approved" } },
            ],
            as: "commentsCount",
          },
        },
        { $addFields: { commentsCount: { $size: "$commentsCount" } } },
        { $sort: { createdAt: -1 } },
      ])
        .skip(skip)
        .limit(limit);

      await Post.populate(posts, { path: "author", select: "-password" });
      await Post.populate(posts, { path: "category" });

      // build the response
      const response = {
        currentPage: page,
        perPage: limit,
        total: await Post.find({
          $and: [{ type: postType }, { status: "published" }],
        }).countDocuments({}),
        data: posts,
      };

      return res.json(response);
    } catch (err) {
      next(err);
    }
  },

  // get a single post
  getPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;

      const post = await Post.findOne({
        $and: [{ slug }, { status: "published" }],
      })
        .populate("category")
        .populate("author", "-password");

      if (!post) {
        res.status(400);
        throw new Error("Cet article n'existe pas");
      }

      return res.json(post);
    } catch (err) {
      next(err);
    }
  },

  // get post comments
  getPostComments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const comments = await Comment.find({ post: id }).sort({
        createdAt: "desc",
      });

      return res.json(comments);
    } catch (err) {
      next(err);
    }
  },

  // create a post
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get data from the request body
      const { title, image, content, tags, category, type, status } = req.body;

      // ensure that all the needed fields are given
      if (!title || !content) {
        res.status(400);
        throw new Error("Veuillez remplir tous les champs");
      }

      if (type === "post") {
        if (!category) {
          res.status(400);
          throw new Error("Veuillez remplir tous les champs");
        }
      }

      await Post.create({
        title,
        image: image || undefined,
        content,
        category: category || undefined,
        author: req.user,
        tags: tags || undefined,
        type: type || undefined,
        status,
      });

      // send back the response
      return res.json({ message: "Article créé avec succès" });
    } catch (err) {
      next(err);
    }
  },

  // update a post
  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      // get data from the request body
      const { title, image, content, tags, category, status } = req.body;

      const post = await Post.findById(id);

      if (!post) {
        res.status(400);
        throw new Error("Cet article n'existe pas");
      }

      // Delete the old post image if the image is updated
      if (image && post.image.publicId) {
        await _cloudinary.uploader.destroy(post.image.publicId);
      }

      // Update the post
      await Post.findByIdAndUpdate(id, {
        title,
        image,
        content,
        category,
        tags,
        status,
      });

      // send back the response
      return res.json({ message: "Article mis à jour avec succès" });
    } catch (err) {
      next(err);
    }
  },

  // delete a post and all its comments
  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {
        res.status(400);
        throw new Error("Cet article n'existe pas.");
      }

      // Delete post image on cloudinary
      if (post.image.publicId) {
        await _cloudinary.uploader.destroy(post.image.publicId);
      }

      // Delete the post
      await Post.findByIdAndDelete(id);

      // Delete all the post comments
      await Comment.deleteMany({ post: id });

      // send back the response
      return res.json({ message: "Article supprimé avec succès" });
    } catch (err) {
      next(err);
    }
  },
};

export default postController;
