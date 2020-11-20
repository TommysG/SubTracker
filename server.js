import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3006;

const app = express();

mongoose.connect(
  `mongodb://new-user69:${process.env.PASSWORD}@cluster0-shard-00-00.msytt.mongodb.net:27017,cluster0-shard-00-01.msytt.mongodb.net:27017,cluster0-shard-00-02.msytt.mongodb.net:27017/<subtrDB>?ssl=true&replicaSet=atlas-e9zoqg-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);

//IMPORTS
import authController from "./auth/authController.js";

/* models */
app.use("/auth", authController);

/* middlewares */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("public"));

/* routes */

/* listen */
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
