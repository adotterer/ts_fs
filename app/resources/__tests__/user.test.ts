import {UserModel as User} from "../user/user.model"

describe("UserModel:", () => {
    describe("password hash", () => {
        test("should hash all passwords", async () => {
            const user = await User.findOne({email: "email@email.com"}).exec()
            expect(user.password).not.toBe("password")
        })
        test("should hash passwords when updated", async () => {
            const user = await User.findOneAndUpdate({email:"email@email.com"},{password: "password2!"}, {new: true})
            expect(user.password).not.toBe("password2!")
        })
    })
})