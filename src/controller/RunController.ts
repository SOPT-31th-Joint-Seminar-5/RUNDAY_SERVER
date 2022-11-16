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

const deleteLike = async (req: Request, res: Response) => {
  const { runId } = req.params;
  const { userId } = req.body;
  
  console.log(userId);

  if(!runId || !userId) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  try {
    const data = await runService.deleteLike(+runId, +userId);
    res.status(200).json({ status: 200, message: "좋아요 취소", data });
  } catch (error) {
    console.log("ERORROR", error)
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
