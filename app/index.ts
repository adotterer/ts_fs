import express from "express";
import { colorConsoleLog } from "./console";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
const app = express();
const port = 8080;

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
app.listen(port, () => {
    colorConsoleLog(`Server started at http://localhost:${port}`);
} );
