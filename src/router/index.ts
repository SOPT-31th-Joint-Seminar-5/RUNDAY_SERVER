import { Router } from "express";
import myPageRouter from "./MyPage";
import runRouters from "./RunRouter";

const router: Router = Router();

router.use("/myPage", myPageRouter);
router.use("/run", runRouters);

export default router;
