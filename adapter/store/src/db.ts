import mongoose from "mongoose";

export const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const uri =
    process.env.MONGODB_URI || "mongodb://admin:password@127.0.0.1:27018/riffyh?authSource=admin";
  await mongoose.connect(uri);
};
