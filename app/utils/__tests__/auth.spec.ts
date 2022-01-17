import {newToken, verifyToken} from "../auth";
// import { UserModel as User } from "../resources/user/user.model";

describe("Authenication:", () => {
    describe("newToken", () => {
        const id = "123";
        const token = newToken(id);
        const user = jwt.verify(token, process.env.JWT_SECRET);
        expect(user).toBe(id);
    })
})