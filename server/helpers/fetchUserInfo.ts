import { prisma } from "../config/client"

export async function fetchUserInfo(userId) {
  const userInfo = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
  })

  if (userInfo) {
    const { user_id, user_name, avatar } = userInfo
    return { user_id, user_name, avatar }
  }

  return { message: "User not found" }
}
