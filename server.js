/* ====== create node.js server with express.js framework ====== */
// dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandlingMiddleware.js";

const app = express();
dotenv.config();
//Databse connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse connected Succesfully");
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

import authRouter from "./routes/auth.js";

// PORT
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//router middleware
app.use("/", authRouter);

//Error handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
