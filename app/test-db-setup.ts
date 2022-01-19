import * as dotenv from 'dotenv';
import mongoose from "mongoose"
import cuid from "cuid";
import {Request, Response as ExpressResponse,  NextFunction} from "express";
import {UserModel as User} from "./resources/user/user.model"

dotenv.config();

beforeEach(async () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    };

    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect("mongodb://127.0.0.1:27017/auth_test" + cuid(), options);
        await User.init()
        await User.create({
                email: 'email@email.com',
                password: 'password',
                username: 'rosie'
                });
        } catch(e) {
          console.error(e);
          throw e
        }
    }
  });

afterEach(async () => {
    await User.deleteMany().exec()
    await mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close()
    });
    await mongoose.disconnect();
});

afterAll(done => done())
