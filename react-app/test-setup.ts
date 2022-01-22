import { start, close } from "../app/server"
import {setup} from "./jestGlobalSetup"
beforeAll(async () => {
    // console.log("Before")
    // await start()
    // console.log("after bitch")
    console.log("hey")
})
afterEach((done) => {
    // close()
    // done()
    console.log("girl")
    done()
})
afterAll((done) => {
    console.log("that's all folks")
    // done("hello")
    done()
})

