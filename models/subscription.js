import mongoose from "mongoose";

export const subSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  starting_date: { type: Date },
  end_date: { type: Date },
  fee: { type: Number },
});

export default mongoose.model("Subscription", subSchema);
