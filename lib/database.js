import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    console.log("MongoDB is already connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "raltsAI",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;

      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
    }
  }
};
