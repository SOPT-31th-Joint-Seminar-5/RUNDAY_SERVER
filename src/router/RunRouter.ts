import { Router } from "express";

import { RunController } from "../controller";

const router: Router = Router();

router.get("/:userId", RunController.getRunInfo);
router.put("/delete/:runId", RunController.deleteLike);

export default router;