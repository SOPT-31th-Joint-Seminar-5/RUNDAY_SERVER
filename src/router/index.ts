import { Router } from "express";
import runRouters from "./RunRouter";

const router: Router = Router();

router.use("/run", runRouters);

export default router;
