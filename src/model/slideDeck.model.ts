import mongoose from "mongoose";

const slideDeckSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    theme: { type: String, required: true },
    audience: { type: String },
    settings: { type: String, required: true },
    content: { type: String, required: true },
    slides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slide" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const SlideDeck = mongoose.models.SlideDeck || mongoose.model("SlideDeck", slideDeckSchema);
export default SlideDeck;
