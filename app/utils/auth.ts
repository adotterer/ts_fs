import jwt from "jsonwebtoken";
import { config } from "process";
import { IUser } from "../resources/user/user.model"

export const newToken = (userId: string) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export const verifyToken = (token: String) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload)
        })
    })
}