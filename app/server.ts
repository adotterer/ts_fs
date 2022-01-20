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
import {signup, protect} from "./utils/auth"

import * as dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.ENVIRONMENT === 'production';

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
if (!isProduction) {
  app.use(cors());
}
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

// https://stackoverflow.com/questions/65828687/how-to-set-csurf-express-middleware-up-to-work-with-postman/66338080

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  next()
})

app.use(routes);

app.get( "/test", (_req,res ) => {
  res.send({msg: "Hello world!"});
});

app.get("/protect", protect, (req, res) => {
  res.send({msg: "What's up"})
});

app.post("/signup", signup);

const port = process.env.PORT;

export const start = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

export default app;
