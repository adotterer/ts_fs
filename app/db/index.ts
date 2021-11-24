import mongoose from "mongoose";

const connectDb = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/whatver')
}

export { connectDb }
