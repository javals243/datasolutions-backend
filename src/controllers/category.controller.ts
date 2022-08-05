import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";
import Post from "../models/post.model";

const categoryController = {
  // get all categories
  getCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await Category.find({}).sort({ createdAt: "desc" });

      return res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  // get category posts
  getCategoryPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      const category = await Category.findById(id);

      if (!category) {
        res.status(400);
        throw new Error("Cette catégorie n'existe pas");
      }

      const posts = await Post.find({ category: id }).sort({
        createdAt: "desc",
      });

      return res.json(posts);
    } catch (err) {
      next(err);
    }
  },

  // create a category
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get data from the request body
      const { name } = req.body;

      // ensure that all the needed fields are given
      if (!name) {
        res.status(400);
        throw new Error("Veuillez reseigner le nom de la catégorie");
      }

      const category = await Category.findOne({ name });

      if (category) {
        res.status(400);
        throw new Error("Cette catégorie existe déjà");
      }

      await Category.create({ name });

      // send back the response
      return res.json({ message: "Catégorie créé avec succès" });
    } catch (err) {
      next(err);
    }
  },

  // update a category
  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      // get data from the request body
      const { name } = req.body;

      const category = await Category.findById(id);

      if (!category) {
        res.status(400);
        throw new Error("Cette catégorie n'existe pas");
      }

      const _category = await Category.findOne({ name });

      if (_category && name) {
        if (String(id) !== String(_category._id)) {
          res.status(400);
          throw new Error("Cette catégorie existe déjà");
        } else {
          await Category.findByIdAndUpdate(id, { name });

          // send back the response
          return res.json({
            message: "Catégorie mise à jour avec succès",
          });
        }
      } else {
        await Category.findByIdAndUpdate(id, { name });

        // send back the response
        return res.json({ message: "Catégorie mise à jour avec succès" });
      }
    } catch (err) {
      next(err);
    }
  },

  // delete a category
  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      const category = await Category.findById(id);

      if (!category) {
        res.status(400);
        throw new Error("Cette catégorie n'existe pas.");
      }

      const posts = await Post.find({ category: category._id });

      if (posts.length) {
        res.status(400);
        throw new Error(
          "Impossible de supprimer. La catégorie contient encore au moins un article."
        );
      }

      await Category.findByIdAndDelete(category._id);

      // send back the response
      return res.json({ message: "Catégorie supprimée avec succès" });
    } catch (err) {
      next(err);
    }
  },
};

export default categoryController;
