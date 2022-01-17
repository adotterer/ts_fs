import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    username: string,
    email: string, 
    hashedPassword: string,
    firstName?: string,
    lastName?: string
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      trim: true,
      default: ""
    },
    lastName: {
      type: String,
      trim: true,
      default: ""
    },

  },
  {timestamps: true}
)

export const UserModel = mongoose.model("User", userSchema)