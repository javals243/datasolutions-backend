import mongoose from "mongoose";
// @ts-ignore
import cloudinary from "cloudinary/lib/v2";

// Connect to MongoDB helper
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (err) {
    console.log(`MongoDB Error: ${err.message}`);
  }
};

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const _cloudinary = cloudinary;
