import mongoose from "mongoose";
import type { Options } from "./Options";

export const connectDb = async (options: Options) => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(options.mongoDBUri);
};
