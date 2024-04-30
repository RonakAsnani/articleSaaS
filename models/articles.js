import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
    },
    highlightedArea: {
      type: [Schema.Types.ObjectId],
      ref: "AnalyzedText",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Article = models.Article || model("Article", ArticleSchema);
export default Article;
