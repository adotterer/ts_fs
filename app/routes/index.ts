import express, {Router} from "express";

const router = Router();

router.get('/hello/world', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
})

export default router;
