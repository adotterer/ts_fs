import {Router} from "express";

const authRouter = Router();

authRouter.get("/",(req, res) =>{

    res.send(
        "<html><h1>Hello World!</h1></html>"
    );
})
export default authRouter;