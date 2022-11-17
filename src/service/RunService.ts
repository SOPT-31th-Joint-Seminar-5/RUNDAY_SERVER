const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRunInfo = async (userId: number) => {
  const isLiked = await prisma.is_liked.findMany({
    where: { user_id: userId },
    select: {
      is_liked: true,
    },
  });
  console.log(isLiked);

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

const updateLiked = async (isLikedId: number, userId: number, runId: number) => {
  const selectId = await prisma.is_liked.findUnique({
    where: { id: isLikedId },
  });

  if (selectId.user_id != userId || selectId.run_id != runId) {
    throw 400;
  }

  const updateLiked = await prisma.is_liked.update({
    where: {
      id: isLikedId,
    },
    data: {
      is_liked: true,
    },
  });

  const data = {
    id: updateLiked.id,
    userId: updateLiked.user_id,
    runId: updateLiked.run_id,
    isLiked: updateLiked.is_liked,
  };

  return data;
};

export default {
  getRunInfo,
  updateLiked,
};
