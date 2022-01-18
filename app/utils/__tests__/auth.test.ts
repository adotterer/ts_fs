import {newToken, signup, verifyToken} from "../auth";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from "express";
import { IUser, UserModel as User} from "../../resources/user/user.model"
dotenv.config();
// import { UserModel as User } from "../resources/user/user.model";


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

        test('creates user and sends new token from user', async () => {
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
                    return this
                },
                async send(result: any) {
                    let user = await verifyToken(result.token)
                    if(typeof user !== "string" && "id" in user) {
                        user = await User.findById(user.id)
                        .lean()
                        .exec()
                        expect(user.email).toBe("cbw@tinkieinc.com")
                    } else {
                        fail("expected type JwtPayload and received type " + typeof user)
                    };
                    
                }
            }

        })
    })


})