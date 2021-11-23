import express from "express";
import { colorConsoleLog } from "./console";
import bodyParser from "body-parser";
import mongoose  from "mongoose"
const app = express();
const port = 8080;

const connectDb = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/whatver')
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get( "/", ( req, res ) => {
    res.send("Hello world!");
} );
app.post("/", (req, res) => {
    // colorConsoleLog(req.body)
    console.log(req.body)
    res.send("hi")
})

const studentSchema = new mongoose.Schema({
  name: String
});

const Student = mongoose.model('student', studentSchema)

export const start = async () => {
  try {
    await connectDb().catch(e => console.log(e));
    const student = await Student.create({ name: "Andrew" });
    console.log("student --->", student);
    app.listen(port, () => {
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e)
  }
}
