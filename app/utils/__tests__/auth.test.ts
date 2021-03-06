import {newToken, signup, signin, verifyToken, protect, CustomResponse, RequestU} from "../auth";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {Response, Request, NextFunction} from "express"
import { UserModel as User} from "../../resources/user/user.model"


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
        });
        test('creates user and sends token from user', async () => {
            expect.assertions(3);
            const req = {
                body: {
                email: 'cbw@tinkieinc.com',
                password: 'password',
                username: "cbw"
                }
            } as Request
            const res: CustomResponse = {
                cookie(key, value, options){
                    expect(true).toBe(true)
                },
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
            }
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
            } as Response
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
            } as Response
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
            } as Response
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
            } as Response
            await signin(req, res)
        })
        test("token is sent with valid credentials provided", async () =>{
            expect.assertions(1)
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
            } as CustomResponse
            await signin(req, res)
        })

    });
    describe("protect", () => {
        test("looks for Bearer token in headers", async () => {
            expect.assertions(2);

            const req = {headers: {}} as RequestU;
            const res = {
                status(status: number) {
                    expect(status).toBe(401)
                    return this;
                },
                end() {
                    expect(true).toBe(true)
                }
            } as Response

            await protect(req,res)
        })
        test("token must have correct prefix", async () => {
            expect.assertions(2);

            const req = { headers: {authorization: newToken("simpledimple")}} as RequestU;
            const res = {
                status(status: number) {
                    expect(status).toBe(401)
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            } as Response
            await protect(req, res)
        })

        test("must be real user", async() => {
            expect.assertions(2)
            const testObj = new mongoose.Types.ObjectId();

            const token = `Bearer ${newToken(testObj.toString())}`

            const req = { headers: { authorization: token } } as RequestU;
            const res = {
                status(status) {
                  expect(status).toBe(401)
                  return this
                },
                end() {
                  expect(true).toBe(true)
                }
              } as Response
            await protect(req, res);
        })
        test("finds user token and passes on", async() => {
            expect.assertions(2)
            const user = await User.create({
                email: "happy@beans.com",
                password: "chickpea",
                username: "beanboy"
            });
            const token = `Bearer ${newToken(user.id)}`
            const req = {headers: {authorization: token}} as RequestU;
            const res = {} as Response
            const next: NextFunction = () => {
                return null
            };

            await protect(req, res, next);
            expect(req.user.username).toBe(user.username)
            expect(req.user._id.toString()).toBe(user.id)
        })
    })
})