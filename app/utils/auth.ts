import jwt from "jsonwebtoken";
import { IUser } from "../resources/user/user.model"

export const newToken = (user: IUser) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET);
}