import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/error.middlware";
import userRoutes from "./routes/user.route";
import seederRoutes from "./routes/seeder.route";
import { connectDB } from "./config";

// App
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(
   cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
   })
);

// Connect to the Database
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
   return res.json("The API is working...");
});
app.use("/api/seeder", seederRoutes);
app.use("/api/users", userRoutes);

// Middlewares for global error handling
app.use(notFound);
app.use(errorHandler);

// Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is running on port ${port}`));
