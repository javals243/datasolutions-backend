import { IUser } from "../@types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Exclude the password property
export const exludePassword = (user: IUser) => {
   const { username, email, role, createdAt } = user;

   return {
      username,
      email,
      role,
      createdAt,
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
export const generateToken = async (payload: number) => {
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
