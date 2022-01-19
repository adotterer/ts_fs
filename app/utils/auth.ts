import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import { UserModel as User} from "../resources/user/user.model"

export type AsyncResponse = {
    status: (status: number) => Response;
    send: (result: any) => Promise<void>
  }

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

export const signup = async (req: Request, res: Response | AsyncResponse, next?: NextFunction) => {
    if(!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).send({message: "Email, username, & password required"})
    }
    try {
        if(await User.findOne({email: req.body.email})) {
            throw new Error("duplicate email")
        }
        const user = await User.create(req.body);
        const token = newToken(user.id);
        return res.status(201).send(token);

    } catch (e) {
        return res.status(400).send(e.message.includes("duplicate") ? "This email is already in use" : "error");
    }
}

export const signin = async (req: Request, res: Response | AsyncResponse, next?: NextFunction) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({message: "Email and password required"})
    }

    try {
        const user = await User.findOne({email: req.body.email}).exec();
        if(!user) throw new Error("No user found")
        if(user.password !== req.body.password) throw new Error("Invalid credentials")
        return res.status(200).send({email: user.email})
    } catch(e) {
        return res.status(401).send(e)
    }

} 

// export const protect = () => {}
