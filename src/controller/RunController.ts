import { Request, Response } from "express";

import runService from "../service/RunService";

const getRunInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const data = await runService.getRunInfo(+userId);

    res.status(200).json({ status: 200, message: "유저 달리기 정보 조회 성공", data });
  } catch (error) {
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
  deleteLike,
};
