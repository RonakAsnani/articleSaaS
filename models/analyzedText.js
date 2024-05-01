import { Schema, model, models } from "mongoose";

const AnalyzeTextSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    xpath: {
      type: String,
    },
    chats: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const AnalyzeText =
  models.AnalyzeText || model("AnalyzeText", AnalyzeTextSchema);
export default AnalyzeText;
