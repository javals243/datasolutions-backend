import mongoose from "mongoose";

export interface IUser {
   _id: mongoose.Types.ObjectId;
   username: string;
   email: string;
   password: string;
   role?: string;
   createdAt?: Date;
   updatedAt?: Date;
}
