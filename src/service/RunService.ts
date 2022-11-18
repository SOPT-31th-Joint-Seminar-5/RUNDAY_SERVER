const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
달리기 정보 가져오기
*/
const getRunInfo = async (userId: number) => {
  //달리기 정보를 조회할 때 is_liked 테이블을 따로 빼줬으므로 response 값에 담기위해 정보 조인해서 가져오기.
  const user = await prisma.run.findMany({
    orderBy: [ //id별로 오름차순 정렬
      {
        id: "asc",
      },
    ],
    where: { user_id: userId },
    select: { //가져오고 싶은 필드만 가져오기.
      id: true,
      title: true,
      routine: true,
      stage: true,
      is_liked: { //join
        select: {
          is_liked: true,
        },
      },
    },
  });

  //async await 구문은 배열을 인자로 받을 수 없음! 따라서 Promise.all과 map을 사용하여 처리할 수 있음!
  //참고 => https://velog.io/@minsangk/2019-09-06-0209-%EC%9E%91%EC%84%B1%EB%90%A8-eik06xy8mm
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


/*
좋아요 누르기
*/
const updateLiked = async (isLikedId: number, userId: number, runId: number) => {
  //is_liked table에서 모든 값을 가져오기.
  const selectId = await prisma.is_liked.findUnique({
    where: { id: isLikedId },
  });

  // params로 받은 is_liked의 id에 있는 runId, userId정보와 body로 넣을 userId와 runId가 같은지 판단
  // 둘중 하나라도 다르면 400에러
  if (selectId.user_id != userId || selectId.run_id != runId) {
    throw 400;
  }

  //모든 값이 맞다면 is_liked를 true(좋아요)로 업데이트
  const updateLiked = await prisma.is_liked.update({
    where: {
      id: isLikedId,
    },
    data: {
      is_liked: true,
    },
  });

  //data를 추출할 때 스네이크 케이스로 나오는 것을 카멜케이스로 변경
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
