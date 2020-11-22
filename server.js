import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3006;

const app = express();

mongoose.connect(
  `mongodb://new-user69:${process.env.PASSWORD}@cluster0-shard-00-00.j9rg0.mongodb.net:27017,cluster0-shard-00-01.j9rg0.mongodb.net:27017,cluster0-shard-00-02.j9rg0.mongodb.net:27017/subTrDB?ssl=true&replicaSet=atlas-xqzpjl-shard-0&authSource=admin&retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to db")
);

//IMPORTS
import authController from "./auth/authController.js";
import subscription from "./routes/subscription.js";

/* middlewares */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

/* models */

app.get("/", (req, res, next) => {
  res.send("Hello");
});
/* routes */
app.use("/auth", authController);
app.use("/subscriptions", subscription);

/* listen */
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
