import express from "express";
import { colorConsoleLog } from "./console";
import {connectDb} from "./db"
import bodyParser from "body-parser";
import mongoose  from "mongoose"
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get( "/", ( req, res ) => {
    res.send("Hello world!");
});

const studentSchema = new mongoose.Schema({
  name: String
});

const Student = mongoose.model('student', studentSchema)
app.post("/student", async (req, res) => {
  const student = await Student.create({ name: "Andrew" });
  console.log("student --->", student);
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send("hi")
})





const port = 8080;

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
