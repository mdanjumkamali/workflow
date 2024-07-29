import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected!!");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
