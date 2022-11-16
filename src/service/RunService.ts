const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRunInfo = async (userId: number) => {
  const isLiked = await prisma.is_liked.findMany({
    where: { user_id: userId },
    select: {
      is_liked: true,
    },
  });
  // const map1 = isLiked.map((x: { is_liked: boolean }) => x.is_liked);

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

const deleteLike = async(runId: number, userId: number) => {
  
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
  const findLikeId = await prisma.is_liked.findUnique({
    where: { run_id: runId },
    select: {
      id: true,
      user_id: true,
    },
  });
  
  console.log(findLikeId.user_id);
  if (!(findLikeId.user_id == userId)) {
    throw 404;
  }
  
  const joinLike = await prisma.is_liked.findUnique({
      where: { user_id: userId, },
      select: {
        id:true
      },
    });
  
  console.log(joinLike);

  
  const delete_like = await prisma.is_liked.update({
    where: { id: joinLike[0] },
    data: {
      is_liked: false,
    },
  });
  return delete_like;
}

//run에서 모든 정보를 읽는데 is_liked의 테이블의 is_liked 컬럼을 조인해야함
export default {
  getRunInfo,
  deleteLike,
};
