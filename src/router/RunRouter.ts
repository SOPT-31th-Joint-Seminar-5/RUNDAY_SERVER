import { Router } from "express";

import { RunController } from "../controller";

const router: Router = Router();

router.get("/:userId", RunController.getRunInfo);
router.put("/like/:isLikedId", RunController.updateLiked);

export default router;
