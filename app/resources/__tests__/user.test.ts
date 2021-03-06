import {UserModel as User} from "../user/user.model"

describe("UserModel:", () => {
    describe("password hash", () => {
        test("should hash all passwords", async() => {
            const user = await User.findOne({email: "email@email.com"}).exec()
            expect(user.password).not.toBe("password")
        })
        test("should hash passwords when updated", async () => {
            await User.create({email: "kinopio@email.com", password: "password", username: "kinopio"})
            const user = await User.findOneAndUpdate({email:"kinopio@email.com"},{password: "password2!"}, {new: false})
            await user.save()
            expect(user.password).not.toBe("password2!")
        })
    })
    describe("user.checkPassword()", () => {
        test("should check both hashed passwords", async () => {
            const user = await User.findOne({email: "email@email.com"}).exec();
            const match = await user.checkPassword("password");
            expect(match).toBe(true)
        })
        test("should return false with incorrect password", async () => {
            const user = await User.findOne({email: "email@email.com"}).exec();
            const match = await user.checkPassword("notpassword");
            expect(match).toBe(false)
        })
    })
})