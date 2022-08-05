import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import {
   comparePassword,
   exludePassword,
   generateToken,
   hashPassword,
} from "../utils";

const userController = {
   // get all users
   getUsers: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const users = await User.find({}).sort({ createdAt: "desc" });

         // send back the response
         return res.json(users);
      } catch (err) {
         next(err);
      }
   },

   // update the user
   updateUser: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { username, email } = req.body;

         const _user = await User.findOne({ email });

         if (_user && email) {
            if (req.user !== _user.id) {
               res.status(400);
               throw new Error("Cette adresse email est déjà prise");
            } else {
               await User.findByIdAndUpdate(req.user, { username, email });

               return res.json({
                  message: "Utilisateur mis à jour avec succès",
               });
            }
         } else {
            await User.findByIdAndUpdate(req.user, { username, email });

            return res.json({ message: "Utilisateur mis à jour avec succès" });
         }
      } catch (err) {
         next(err);
      }
   },

   // register a new user
   register: async (req: Request, res: Response, next: NextFunction) => {
      try {
         // get data from the request body
         const { username, email, password, role } = req.body;

         // ensure that all the needed fields are given
         if (!username || !email || !password) {
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
         }

         // ensure the user does not already exists
         const user = await User.findOne({ email });

         if (user) {
            res.status(400);
            throw new Error("Cet utilisateur existe déjà");
         }

         // create the user
         const createdUser = await User.create({
            username,
            email,
            password: await hashPassword(password),
            role: role || undefined,
         });

         // build the response object
         const _response = {
            ...exludePassword(createdUser),
            token: await generateToken(createdUser._id),
         };

         // send back the response
         return res.json(_response);
      } catch (err) {
         next(err);
      }
   },

   // login a user
   login: async (req: Request, res: Response, next: NextFunction) => {
      try {
         // get data from the request body
         const { email, password } = req.body;

         // ensure all the required fileds are given
         if (!email || !password) {
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
         }

         // check if the user already exists
         const user = await User.findOne({ email });

         if (!user) {
            res.status(400);
            throw new Error("Email ou mot de passe incorrect");
         }

         // check if the password matches
         if (!(await comparePassword(password, user.password))) {
            res.status(400);
            throw new Error("Email ou mot de passe incorrect");
         }

         // build the response object
         const _response = {
            ...exludePassword(user),
            token: await generateToken(user._id),
         };

         // send bach the response
         return res.json(_response);
      } catch (err) {
         next(err);
      }
   },

   // get authenticated user info
   me: async (req: Request, res: Response, next: NextFunction) => {
      try {
         // get user via the id available in the request
         const user = await User.findById(req.user);

         // send back the response
         return res.json(exludePassword(user));
      } catch (err) {
         next(err);
      }
   },

   // change the password
   changePassword: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { oldPassword, newPassword } = req.body;

         if (!oldPassword || !newPassword) {
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
         }

         const user = await User.findById(req.user);

         if (!(await comparePassword(oldPassword, user.password))) {
            res.status(400);
            throw new Error("Ancien mot de passe invalide");
         }

         await User.findByIdAndUpdate(req.user, {
            password: await hashPassword(newPassword),
         });

         return res.json({ message: "Mot de passe mis à jour avec succès" });
      } catch (err) {
         next(err);
      }
   },

   // get all users
   deleteUser: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { id } = req.params;

         const user = await User.findOne({ _id: id });

         if (!user) {
            res.status(400);
            throw new Error("Cet utilisateur n'existe pas");
         }

         await User.findByIdAndDelete(user._id);

         // send back the response
         return res.json({ message: "Utilisateur supprimé avec succès" });
      } catch (err) {
         next(err);
      }
   },
};

export default userController;
