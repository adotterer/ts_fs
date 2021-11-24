import mongoose from "mongoose";
import config from "../config"

const connectDb = () => {
    return mongoose.connect(config.db.host + config.db.database)
}

export { connectDb }
