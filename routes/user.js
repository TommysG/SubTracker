import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find().exec();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

export default router;
