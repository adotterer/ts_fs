import app, {TestModel}  from "./server"
import supertest from "supertest"
import mongoose from "mongoose"


beforeEach((done) => {
  mongoose.connect("mongodb://127.0.0.1:27017/JestDB_CBW").then(() => done())
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("GET /test", async () => {
  const testRow = await TestModel.create({ username: "ColdBoyWinter" });
  console.log(testRow.id)
  await supertest(app).get("/test")
    .expect(200)
    .then((res) => {
      expect(res.body.msg).toBe('Hello world!')
    })
  await supertest(app).get("/test/" + testRow.id)
    .expect(200)
    .then((res) => {
    expect(res.body.username).toBe(testRow.username)
  })
  // await supertest(app).get("/test/" + testRow.id)
})
