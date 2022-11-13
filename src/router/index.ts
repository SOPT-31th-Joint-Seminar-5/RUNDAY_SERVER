import { Router } from "express";
import routers from "./router";

const router: Router = Router();

router.use("/user", routers);

export default router;
