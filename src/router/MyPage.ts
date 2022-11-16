import { Router } from "express";
import mypageController from "../controller/MyPageController";

const myPageRouter: Router = Router();

myPageRouter.get("/:userId", mypageController.getUserById);

export default myPageRouter;