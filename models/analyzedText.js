import { Schema, model, models } from "mongoose";

const AnalyzeTextSchema = new Schema({
  textContent: {
    type: String,
    required: [true, "Text is required"],
  },
  translatedText: {
    type: String,
  },
  isAudioConverted: {
    type: Boolean,
  },
  sentimentAnalysis: {
    type: String,
  },
  summary: {
    type: String,
  },
  chats: {
    type: [
      {
        message: String,
        owner: String,
      },
    ],
  },
  timestamps: true,
});

const AnalyzeText =
  models.AnalyzeText || model("AnalyzeText", AnalyzeTextSchema);
export default AnalyzeText;
