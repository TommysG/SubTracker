import mongoose from "mongoose";
import { subSchema } from "../models/subscription.js";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: { type: String, require: true },
  subscriptions: [subSchema],
});

export default mongoose.model("User", userSchema);
