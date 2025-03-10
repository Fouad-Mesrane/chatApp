import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/chatapp`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
