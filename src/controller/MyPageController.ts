import { Request, Response } from "express";
import myPageService from "../service/MyPageService";

//* 유저 조회
const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    if(!userId){
      return res.status(404).json({ status: 404, message: "NOT_FOUND" });
    }
    const data = await myPageService.getUserById(+userId);
  
    
    
    if (Object.keys(data).length == 0) {
      return res.status(404).json({ status: 404, message: "NOT_FOUND" });
    } 
    
    // if(data ==404){
    //   return res.status(404).json({ status: 404, message: "NOT_FOUND" });
    // }
      return res.status(200).json({ status: 200, message: "유저 조회 성공", data }); 
    
  };
  

const mypageController = {
  getUserById
}

export default mypageController;
