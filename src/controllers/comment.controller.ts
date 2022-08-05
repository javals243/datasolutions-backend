import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model";

const commentController = {
  // get all comments
  getComments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await Comment.find({})
        .populate("post")
        .sort({ createdAt: "desc" });

      return res.json(comments);
    } catch (err) {
      next(err);
    }
  },

  // create a comment
  createComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get data from the request body
      const { authorName, authorEmail, content, post } = req.body;

      // ensure that all the needed fields are given
      if (!authorName || !authorEmail || !content || !post) {
        res.status(400);
        throw new Error("Veuillez remplir tous les champs");
      }

      await Comment.create({
        authorName,
        authorEmail,
        content,
        post,
      });

      // send back the response
      return res.json({
        message:
          "Votre commentaire a été ajouté avec succès, et est en attente d'approbation de l'administrateur du site.",
      });
    } catch (err) {
      next(err);
    }
  },

  // approve a comment
  approveComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      const { status } = req.body;

      if (!status) {
        res.status(400);
        throw new Error("Veuillez renseigner le statut du commentaire");
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        res.status(400);
        throw new Error("Ce commentaire n'existe pas");
      }

      await Comment.findByIdAndUpdate(id, { status });

      // send back the response
      return res.json({ message: "Opération effectuée avec succès" });
    } catch (err) {
      next(err);
    }
  },

  // update a comment
  updateComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      // get data from the request body
      const { authorName, authorEmail, content } = req.body;

      const comment = await Comment.findById(id);

      if (!comment) {
        res.status(400);
        throw new Error("Ce commentaire n'existe pas");
      }

      await Comment.findByIdAndUpdate(id, {
        authorName,
        authorEmail,
        content,
      });

      // send back the response
      return res.json({ message: "Commentaire mis à jour avec succès" });
    } catch (err) {
      next(err);
    }
  },

  // delete a comment
  deleteComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the request params
      const { id } = req.params;

      const comment = await Comment.findById(id);

      if (!comment) {
        res.status(400);
        throw new Error("Ce commentaire n'existe pas.");
      }

      await Comment.findByIdAndDelete(id);

      // send back the response
      return res.json({ message: "Commentaire supprimé avec succès" });
    } catch (err) {
      next(err);
    }
  },
};

export default commentController;
