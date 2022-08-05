import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { verifyToken } from "../utils";

export const protect = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      if (!req.headers.authorization) {
         res.status(401);
         throw new Error("Pas de token");
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token || !req.headers.authorization.startsWith("Bearer")) {
         res.status(401);
         throw new Error("Echec d'authentification");
      }

      const decoded = (await verifyToken(token)) as { id: string };

      req.user = decoded.id;

      next();
   } catch (err) {
      res.status(401);
      next(err);
   }
};

export const isAdmin = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await User.findById(req.user);

      if (user.role !== "admin") {
         res.status(403);
         throw new Error("Seul un administrateur peut exécuter cette action.");
      }

      next();
   } catch (err) {
      res.status(401);
      next(err);
   }
};
