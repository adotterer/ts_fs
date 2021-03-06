import express from "express";
import morgan from "morgan";
import cors from "cors";
import csurf from "csurf";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { colorConsoleLog } from "./console";
import {connectDb} from "./db"
import bodyParser from "body-parser";
import {signup, signin, protect} from "./utils/auth"
import path from "path"
import http from "http"
import mongoose from "mongoose"

import * as dotenv from 'dotenv';
import { Http2ServerRequest } from "http2";
import { Mongoose } from "mongoose";
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

app
  .get("/test", (_req,res ) => {
  res.send({msg: "Hello world!"});
})
  .post("/test", (req, res)  => {
    const {msg} = req.body;
    return res.status(201).send({msg})
})

app.get("/protect", protect, (req, res) => {
  res.send({msg: "What's up"})
});

app.post("/api/signup", signup);
app.post("/api/signin", signin);

if (isProduction) {

  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../react-app', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve('../react-app/build')));

  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../react-app', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (!isProduction) {
  app.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(201).json({});
  });
}

const port = process.env.PORT;
let server: http.Server;

export const start = async () => {
  try {
    await connectDb();
    server = app.listen(process.env.PORT, () => {
        colorConsoleLog(`Server started at http://localhost:${port}`);
    });

  } catch (e) {
    console.error(e);
  }
}

export const close = () => {
  server.close(() => console.log("Server closed"));
  mongoose.connection.close()
}

export default app;
