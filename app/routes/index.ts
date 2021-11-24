import express, {Router} from "express";
import apiRouter from "./api"
const router = Router();

router.get('/hello/world', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

router.use("/api", apiRouter);

export default router;
