import {newToken, signup, verifyToken} from "../auth";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import mongoose from "mongoose"
import express, {Request, Response, NextFunction} from "express";
import { IUser, UserModel as User} from "../../resources/user/user.model"
import { removeListener } from "process";
dotenv.config();
// import { UserModel as User } from "../resources/user/user.model";

beforeEach(async () => {
    const options = {
        useNewUrlParser: true,
        autoIndex: true
    };
    // function clearDB() {
    //     return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
    //   }
   const {drivers} = mongoose.connection.collections;
   
    // function clearDB() {
    //   return Promise.all(_.map(mongoose.connection.collections, (c: any) => remove(c)))
    // }
    if (mongoose.connection.readyState === 0) {
      try {
  
        await mongoose.connect("mongodb://127.0.0.1:27017/JestDB_having_funn", 
        options);
        await User.deleteMany();
        await User.init()
        // await clearDB();
        // await Promise.all(Object.keys(models).map(name => models[name].init()))
        } catch(e) {
          console.error(e);
          throw e
        }
    }
  
  });
  
  afterEach(async () => {
    await mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close()
    });
    await mongoose.disconnect();

  
  });

  afterAll(done => done())

describe("Authenication:", () => {
    describe("newToken", () => {
        test("creates new jwt from user id", () => {
            const id = "123";
            const token = newToken(id);
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if(typeof user !== "string" && "id" in user) {
                expect(user.id).toBe(id)
            } else {
                fail("expected type JwtPayload and received type " + typeof user)
            };
        })
    })
    describe('verifyToken', () => {
        test('validates jwt and returns payload', async () => {
            const id = 1234;
            const token = jwt.sign({id}, process.env.JWT_SECRET);
            const user = await verifyToken(token);
            if(typeof user !== "string" && "id" in user) {
                expect(user.id).toBe(id)
            } else {
                fail("expected type JwtPayload and received type " + typeof user)
            };

        })
    })
    describe('signup', () => {
        test('requires email and password', async () => {
            expect.assertions(2);

            const req = { body: {} } as Request;
            const res = {
                status(status: number) {
                    expect(status).toBe(400)
                    return this
                },
                send(result: any) {
                    expect(typeof result.message).toBe("string");
                }
            } as Response
            await signup(req,res)
        })
        test('creates user and sends token from user', async () => {
            expect.assertions(2);
            let token: string;
            const req = <Request>{
                body: {
                email: 'cbw@tinkieinc.com',
                password: 'password',
                username: "cbw"
                }
            }
            const res = <Response>{
                status(status: number) {
                    expect(status).toBe(201);
                    return this;
                },
                send(result: any) {
                    token = result;
                }
            }       
        
                await signup(req, res);  
                const user = await User.findOne({email: 'cbw@tinkieinc.com'});
                let tokenObj = await verifyToken(token);
                if(typeof tokenObj !== "string" && "id" in tokenObj) {
                    expect(tokenObj.id).toBe(user.id);
                }
        })
    })


})