import mongoose from "mongoose";

const connectDb = () => {
  return mongoose.connect(
    process.env.DB_HOST + process.env.DB_DATABASE)
}

export { connectDb }
