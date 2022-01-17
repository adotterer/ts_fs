import jwt from "jsonwebtoken";
import { config } from "process";
import { IUser } from "../resources/user/user.model"

export const newToken = (user: IUser) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}