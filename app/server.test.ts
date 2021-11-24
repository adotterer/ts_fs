import app from "./server"
import supertest from "supertest"

test("GET /test", async () => {
  await supertest(app).get("/test")
    .expect(200)
    .then((res) => {
      expect(res.body.msg).toBe('Hello world!')
    })
})
