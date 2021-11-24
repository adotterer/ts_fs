import express from "express";
import morgan from "morgan";
import cors from "cors";
import csurf from "csurf";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { colorConsoleLog } from "./console";
import {connectDb} from "./db"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cuid from 'cuid';

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

const port = process.env.PORT || 8080;

export const start = async () => {
  try {
    await connectDb().catch(e => console.log(e));
    app.listen(port, () => {
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e.message)
    console.error(e)
  }
}

export default app;
