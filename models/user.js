import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  UrlIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const User = models.User || model("User", UserSchema);
export default User;
