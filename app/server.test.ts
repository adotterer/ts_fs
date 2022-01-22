import app from "./server"
import supertest from "supertest"

describe("server app", () => {

  test("GET /test", async () => {
    await supertest(app).get("/test")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe('Hello world!')
      })
  
  })

  test("should set the XSRF Token in cookies", async () => {
    await supertest(app).get('/api/csrf/restore')
      .expect(201)

      // look at node-cookiejar
      // https://github.com/visionmedia/supertest/issues/614
  })
})
