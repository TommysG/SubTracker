import express, { response } from "express";
import Subscription from "../models/subscription.js";
import multer from "multer";
import User from "../models/user.js";
import { uploadImageToStorage } from "../storage.js";

// ---------> MULTER CONFIGS
const storage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

//POST REQUEST

router.post("/new", storage.single("image"), async (req, res, next) => {
  const { user_id, description, period, name, fee } = req.body;
  const file = req.file;

  uploadImageToStorage(file)
    .then((url) => {
      const newSub = {
        image: url,
        description,
        user_id,
        name,
        // start_date,
        // end_date,
        period,
        fee,
      };

      User.findOneAndUpdate(
        { id: user_id },
        { $push: { subscriptions: newSub } },
        { new: true }
      )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//GET REQUESTS

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const products = await User.findOne({ id }).select("subscriptions").exec();

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

//DELETE REQUEST

router.delete("/delete", async (req, res, next) => {
  const user_id = req.query.user_id;
  const item_id = req.query.item_id;

  try {
    const subs = await User.findOneAndUpdate(
      { id: user_id },
      { $pull: { subscriptions: { _id: item_id } } }
    );

    const updated = await User.findOne({ id: user_id })
      .select("subscriptions")
      .exec();

    res.status(200).send({ sucess: true, products: updated });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

export default router;
