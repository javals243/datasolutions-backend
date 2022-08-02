import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      const db = await mongoose.connect(process.env.MONGODB_URI);

      console.log(`MongoDB connected: ${db.connection.host}`);
   } catch (err) {
      console.log(`MongoDB Error: ${err.message}`);
   }
};
