import { Router } from "express";

import { RunController } from "../controller";

const router: Router = Router();

router.get("/:userId", RunController.getRunInfo);
router.put("/like/:isLikedId", RunController.updateLiked);
router.put("/like/delete/:isLikedId", RunController.deleteLike);

export default router;
