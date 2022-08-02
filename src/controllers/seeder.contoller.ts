import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils";
import dummyData from "../utils/dummyData";
import User from "../models/user.model";

const seederController = {
   createUsers: async (req: Request, res: Response, next: NextFunction) => {
      try {
         await User.deleteMany({});

         dummyData.users.forEach(async (user) => {
            await User.create({
               username: user.username,
               email: user.email,
               password: await hashPassword(user.password),
               role: user.role || undefined
            });
         });

         return res.json("Fake users created");
      } catch (err) {
         next(err);
      }
   },
};

export default seederController;
