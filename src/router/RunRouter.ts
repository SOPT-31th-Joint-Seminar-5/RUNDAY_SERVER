import { Router } from "express";

import { RunController } from "../controller";

const router: Router = Router();

router.get("/:userId", RunController.getRunInfo);

export default router;