import { prisma } from "../config/client"

export async function fetchUserInfo(userId) {
  // const query = `SELECT id, name, img FROM usuario WHERE id = '${userId}'`
  const userInfo = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
  })

  if (userInfo) {
    const { user_id, user_name, avatar } = userInfo
    return { user_id, user_name, avatar }
  }

  // try {
  //   const userInfo = await giffyDb.queryDatabase({ query })

  //   console.log("userInfo", userInfo)

  //   if (!userInfo) {
  //     return null
  //   }

  //   return userInfo.rows[0]
  // } catch (err) {
  //   console.error("Error al consultar la base de datos", err)
  //   return { message: "Error al consultar la base de datos" }
  // }
}

// import { giffyDb } from "../database/databaseOps"

// export async function fetchUserInfo(userId) {
//   //: string
//   const query = `SELECT id, name, img FROM usuario WHERE id = '${userId}'`

//   try {
//     const userInfo = await giffyDb.queryDatabase({ query })

//     console.log("userInfo", userInfo)

//     if (!userInfo) {
//       return null
//     }

//     return userInfo.rows[0]
//   } catch (err) {
//     console.error("Error al consultar la base de datos", err)
//     return { message: "Error al consultar la base de datos" }
//   }
// }
