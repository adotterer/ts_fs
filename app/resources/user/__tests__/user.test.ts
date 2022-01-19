import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import {UserModel as User } from "../user.model";


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

describe("why are you doing this to me???", () => {
    test("it should stop being annoying af", () => {
        
        fail("bitch")
    })
})