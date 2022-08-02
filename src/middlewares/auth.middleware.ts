import { NextFunction, Request, Response } from "express";
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
