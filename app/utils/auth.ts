import jwt from "jsonwebtoken";
import express, {Request, Response, NextFunction} from "express";
import { config } from "process";
import { IUser, UserModel as User} from "../resources/user/user.model"

export const newToken = (userId: string) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export const verifyToken = (token: string) => {
    return new Promise<string | jwt.JwtPayload>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload)
        })
    })
}

export const signup = async (req: Request, res: Response, next?: NextFunction) => {
    if(!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).send({message: "Email, username, & password required"})
    }

    try {
        const user = await User.create(req.body);
        const token = newToken(user.id);
        return res.status(201).send(token);

    } catch (e) {
        console.error(e);
        return res.status(400).send(e.message.includes("duplicate") ? "This email is already in use" : "error");
    }
}

// export const signin = () => {}

// export const protect = () => {}
