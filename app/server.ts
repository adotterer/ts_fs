import express from "express";
import { colorConsoleLog } from "./console";
import {connectDb} from "./db"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cuid from 'cuid';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const testSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    }
  },
   {timestamps: true}
)

export const TestModel = mongoose.model('test', testSchema)

app.get( "/test", (req,res ) => {
  res.send({msg: "Hello world!"});
});

app.get("/test/:id", (req, res) => {
  const { id } = req.params;
  
})

const studentSchema = new mongoose.Schema({
  name: String
});

const Student = mongoose.model('student', studentSchema);
app.post("/student", async (req, res) => {
  const student = await Student.create({ name: "Andrew" });
  console.log(cuid())
  res.send(student)
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send("hi")
})


const port = process.env.PORT || 8080;

export const start = async () => {
  try {
    await connectDb().catch(e => console.log(e));
    app.listen(port, () => {
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e)
  }
}

export default app;
