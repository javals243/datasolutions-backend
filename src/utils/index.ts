import { IUser } from "../@types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Exclude the password property
export const exludePassword = (user: IUser) => {
   const { _id, username, email, role, createdAt, updatedAt } = user;

   return {
      _id,
      username,
      email,
      role,
      createdAt,
      updatedAt,
   };
};

// Hash the password
export const hashPassword = async (password: string): Promise<string> => {
   return await bcrypt.hash(password, 10);
};

// Compare passwords
export const comparePassword = async (
   plainTextPassword: string,
   hashedPassword: string
): Promise<boolean> => {
   return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Generate a JWT
export const generateToken = async (payload: mongoose.Types.ObjectId) => {
   return await jwt.sign({ id: payload }, process.env.JWT_SECRET as string, {
      expiresIn: "3d",
   });
};

// Verify a JWT
export const verifyToken = async (token: string) => {
   try {
      return await jwt.verify(token, process.env.JWT_SECRET as string);
   } catch (err) {
      throw new Error("Token invalide");
   }
};
