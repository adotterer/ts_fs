import {newToken, verifyToken} from "../auth";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
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
})