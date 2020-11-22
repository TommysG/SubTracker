import mongoose from "mongoose";

export const subSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  fee: { type: Number },
  image: { type: String },
  description: { type: String },
  period: { type: String, enum: ["Weekly", "Monthly", "Yearly"] },
});

export default mongoose.model("Subscription", subSchema);
