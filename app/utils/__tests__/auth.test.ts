import {newToken, signup, signin, verifyToken, AsyncResponse} from "../auth";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import mongoose from "mongoose"
import cuid from "cuid";
import {Request, Response as ExpressResponse,  NextFunction} from "express";
import { IUser, UserModel as User} from "../../resources/user/user.model"

// dotenv.config();

// beforeEach(async () => {
//     const options = {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         autoIndex: true,
//     };

//     if (mongoose.connection.readyState === 0) {
//       try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/auth_test" + cuid(), options);
//         await User.init()
//         await User.create({
//                 email: 'email@email.com',
//                 password: 'password',
//                 username: 'rosie'
//                 });
//         } catch(e) {
//           console.error(e);
//           throw e
//         }
//     }
//   });

// afterEach(async () => {
//     await User.deleteMany().exec()
//     await mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close()
//     });
//     await mongoose.disconnect();
// });

// afterAll(done => done())

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
            } as ExpressResponse
            await signup(req,res)
        })
        test('creates user and sends token from user', async () => {
            expect.assertions(2);
            const req = {
                body: {
                email: 'cbw@tinkieinc.com',
                password: 'password',
                username: "cbw"
                }
            } as Request
            const res = {
                status(status: number) {
                    expect(status).toBe(201);
                    return this;
                },
                async send(result: any){
                    const verifiedToken =  await verifyToken(result);
                    const user = await User.findOne({email:'cbw@tinkieinc.com'})
                    if(typeof verifiedToken !== "string" && "id" in verifiedToken){
                        expect(verifiedToken.id).toBe(user.id)
                    } else {
                        fail("token error")
                    }
                }
            } as AsyncResponse
                await signup(req, res);
        });
        test("should not allow duplicate emails", async () => {
            expect.assertions(2);
            const req = {
                body: {
                email: 'email@email.com',
                password: 'password',
                username: "rosie"
                }
            } as Request
            const res = {
                status(status: number) {
                    expect(status).toBe(400);
                    return this;
                },
                send(result: any) {
                    expect(result).toBe("This email is already in use")
                }
            } as ExpressResponse
            await signup(req, res);
        })
    })
    describe('signin', () => {
        test("requires email and password", async () => {
            expect.assertions(2);
            const req = { body: {}} as Request;
            const res = {
                status(status: number) {
                    expect(status).toBe(400)
                    return this;
                },
                send(result: any) {
                    expect(typeof result.message).toBe("string")
                }
            } as ExpressResponse
            await signin(req, res)
        })
        test("user must be real", async () => {
            expect.assertions(2);
            const req = {body: {
                email: "test@notHere.com",
                password: "1234"
            }} as Request
            const res = {
                status(status: number) {
                    expect(status).toBe(401)
                    return this;
                },
                send(result: any) {
                    expect(typeof result.message).toBe("string")
                }
            } as ExpressResponse
            await signin(req, res)
        })
        test("passwords must match", async () => {
            expect.assertions(2);
            const req = {body: {
                email: "email@email.com",
                password: "wrongpassword"
            }} as Request
            const res = {
                status(status: number) {
                    expect(status).toBe(401);
                    return this;
                },
                send(result: any) {
                    expect(typeof result.message).toBe("string")
                }
            } as ExpressResponse
            await signin(req, res)
        })
        test("token is sent with valid credentials provided", async () =>{
            const testUser = await User.findOne({email: "email@email.com"}).exec();
            const userToken = newToken(testUser.id)

            const req =  {
                body: {
                    email: "email@email.com",
                    password: "password"
                }
            } as Request
            const res = {
                status(status: number) {
                    return this;
                },
                async send(result: any) {
                    expect(result.token).toBe(userToken)
                    return this
                }
            } as AsyncResponse
            await signin(req, res)
        })

    });
    describe("protect", () => {
        test("looks for Bearer token in headers", () => {
        
            fail("this one isn't written yet")
        })
    })
})