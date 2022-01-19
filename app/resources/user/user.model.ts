import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser {
    username: string,
    email: string,
    password: string,
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
      required: true,
      unique: true
    },
    password: {
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

userSchema.methods.checkPassword = function(password: string): Promise<boolean> {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if(err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}
export const UserModel = mongoose.model("User", userSchema)