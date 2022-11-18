const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRunInfo = async (userId: number) => {
  const isLiked = await prisma.is_liked.findMany({
    where: { user_id: userId },
    select: {
      is_liked: true,
    },
  });

  const user = await prisma.run.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      title: true,
      routine: true,
      stage: true,
      is_liked: {
        select: {
          is_liked: true,
        },
      },
    },
  });

  const customUsers = await Promise.all(
    user.map(async (user: any) => {
      const customUser = {
        id: user.id,
        title: user.title,
        routine: user.routine,
        stage: user.stage,
        is_liked: user.is_liked.pop().is_liked,
      };

      return customUser;
    }),
  );
  
  const data = {
    user: customUsers,
  };
  
  return data;
};

const deleteLike = async(isLikedId: number, runId: number, userId: number) => {
  
  const selectId = await prisma.is_liked.findUnique({
    where: { id: isLikedId },
  });
  
  if (selectId.user_id != userId || selectId.run_id != runId) {
    throw 400;
  }
  
  const deleteLiked = await prisma.is_liked.update({
    where: {
      id: isLikedId,
    },
    data: {
      is_liked: false,
    },
  });
  
  const data = {
    id: deleteLiked.id,
    userId: deleteLiked.user_id,
    runId: deleteLiked.run_id,
    isLiked: deleteLiked.is_liked,
  };

  return data;
};

  // const findLikeId = await prisma.is_liked.findMany({
  //   where: { run_id: runId },
  //   select: {
  //     id: true,
  //     user_id: true,
  //   },
  // });
  
  // console.log(findLikeId);
  // // if (!(findLikeId.user_id == userId)) {
  // //   throw 404;
  // // }
  // // console.log(111);
  
  // const joinLike = await Promise.all(
  //   findLikeId.map(async (findLikeId: any) => {
  //     const like_id = {
  //       id: findLikeId.id,
  //       user_id: userId,
  //     };
  //     return like_id.id;
  //   }),
  // );
  // console.log(joinLike);

//run에서 모든 정보를 읽는데 is_liked의 테이블의 is_liked 컬럼을 조인해야함
export default {
  getRunInfo,
  deleteLike,
};
