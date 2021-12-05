import express from "express";
import morgan from "morgan";
import cors from "cors";
import csurf from "csurf";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes"
import { colorConsoleLog } from "./console";
import {connectDb} from "./db"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cuid from 'cuid';

import * as dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.ENVIRONMENT === 'production'
const app = express();
if (!isProduction) {
  app.use(cors());
}
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? "lax" : false,
      httpOnly: true
    }
  })
);

app.use(routes);

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

app.get("/test/:id", async (req, res) => {
  const { id } = req.params;
  const foundRow = await TestModel.findById(id)
  res.send(foundRow)
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send("hi")
})

const port = process.env.PORT;

export const start = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
        console.log(process.env.PORT)
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

export default app;
