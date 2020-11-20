import admin from "../admin.js";
import express from "express";

import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!password || !email || !name)
    return res.status(400).send({ message: "missing fields" });

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    const { uid } = user;

    await new User({
      id: uid,
      email,
      password,
      displayName: name,
    }).save();

    res.status(201).send({ success: true, user: user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
