import app, {TestModel}  from "./server"
import supertest from "supertest"
import mongoose from "mongoose"

// const models = { TestModel };
// const remove = (collection: any)=>
//   new Promise<void>((resolve, reject) => {
//     collection.remove((err?: Error) => {
//       if (err) return reject(err)
//       resolve()
//     })
//   })

beforeEach(async () => {
  // function clearDB() {
  //   return Promise.all(_.map(mongoose.connection.collections, (c: any) => remove(c)))
  // }
  if (mongoose.connection.readyState === 0) {
    try {
      
      await mongoose.connect("mongodb://127.0.0.1:27017/JestDB_CBW");
      await TestModel.init()
      // await clearDB();
      // await Promise.all(Object.keys(models).map(name => models[name].init()))
      } catch(e) {
        console.error(e);
        // throw e
      }
  } 

});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close()
  });

});

test("GET /test", async () => {
  const testRow = await TestModel.create({ username: "CBW" });

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
})
