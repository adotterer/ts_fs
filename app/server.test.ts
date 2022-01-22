import app from "./server"
import request from "supertest"
import {CookieAccessInfo} from "cookiejar"
import { verifyToken }from "./utils/auth"
import nodeFetch from "node-fetch"
describe("server app", () => {
  
  const agent = request.agent(app);
  test("GET /test", async () => {
    agent.get("/test").expect(200).then((res) => {
      expect(res.body.msg).toBe("Hello world!")
    })
  })

  test("should set the XSRF Token in cookies", async () => {
    await agent.get("/api/csrf/restore").expect(201)
    const access_info = new CookieAccessInfo("/api/csrf/restore")
    const cookie = agent.jar.getCookie("XSRF-TOKEN",access_info)
    // const tokenOk = await verifyToken(cookie.value)
    const res = await nodeFetch("/test")
    console.log(res)
    expect(true).toBe("muffins")
    })

      // look at node-cookiejar
      // https://github.com/visionmedia/supertest/issues/614
    
})
