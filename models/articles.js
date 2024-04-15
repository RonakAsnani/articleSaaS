import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema({
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  chats: {
    type: Array,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Article = models.User || model("Article", ArticleSchema);
export default Article;
