import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hasedPassword: {

    },
    firstName: String,
    lastName: String,

  },
  {timestamps: true}
)
