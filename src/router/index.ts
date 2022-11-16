import { Router } from "express";
import routers from "./router";
import myPageRouter from "./MyPage";
const router: Router = Router();

router.use("/user", routers);
router.use("/myPage", myPageRouter);

export default router;
