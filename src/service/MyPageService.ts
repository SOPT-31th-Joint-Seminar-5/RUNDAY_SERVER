const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getUserById = async (userId: number) => {
    const user = await prisma.User.findUnique({
        where: {
          id: userId,
        }
      });
      return user;
};

const MyPageService ={
  getUserById
}
export default MyPageService;