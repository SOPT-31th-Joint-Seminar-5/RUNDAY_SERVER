import { Request, Response } from "express";

import runService from "../service/RunService";

/**
 * @route GET /run/:userId
 * @Desc Get run info
 * @Access public
 */
const getRunInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const data = await runService.getRunInfo(+userId);

    res.status(200).json({ status: 200, message: "유저 달리기 정보 조회 성공", data });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
  }
};

/**
 * @route UPDATE /run/:isLikedId
 * @Desc Update isLiked
 * @Access public
 */
const updateLiked = async (req: Request, res: Response) => {
  const { isLikedId } = req.params;
  const userId = req.body.userId;
  const runId = req.body.runId;

  if (!userId || !runId || !isLikedId) {
    return res.status(400).json({ status: 400, message: "BAD_REQUEST" });
  }
  try {
    const data = await runService.updateLiked(+isLikedId, userId, runId);

    return res.status(200).json({ status: 200, message: "좋아요 누르기 성공", data });
  } catch (error) {
    if (error == 400) {
      return res.status(400).json({ status: 404, message: "NOT_FOUND" });
    }
    res.status(500).json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
  }
};

/**
 * @route UPDATE /like/delete/:isLikedId
 * @Desc Update isLiked
 * @Access public
 */
const deleteLike = async (req: Request, res: Response) => {
  const { isLikedId } = req.params;
  const userId  = req.body.userId;
  const runId = req.body.runId

  if(!runId || !userId || !isLikedId) {
    return res.status(404).json({ status: 400, message: "BAD_REQUEST" });
  }
  try {
    const data = await runService.deleteLike(+isLikedId, +runId, +userId);
    res.status(200).json({ status: 200, message: "좋아요 취소", data });
  } catch (error) {
    if (error == 404) {
      return res.status(404).json({ status: 404, message: "NOT_FOUND" });
    }
    res.status(500).json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
  }
};

export default {
  getRunInfo,
  updateLiked,
  deleteLike,
};
