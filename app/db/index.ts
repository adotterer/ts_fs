import mongoose from "mongoose";

const connectDb = () => {
  console.log(" process.env.DB_HOST", process.env.DB_HOST)
  return mongoose.connect(
    process.env.DB_HOST + process.env.DB_DATABASE)
}

export { connectDb }
