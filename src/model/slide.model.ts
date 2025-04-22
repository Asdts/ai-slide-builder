import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    slideIndex: { type: Number, required: true },
    contentMarkdown: { type: String, required: true },
    previousContent: { type: String },
    plainTextSummary: { type: String },
    type: {
      type: String,
      enum: ["first", "new", "edited", "inserted"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Slide = mongoose.models.Slide || mongoose.model("Slide", slideSchema);
export default Slide;