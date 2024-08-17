// import pg from "pg"
// import { DB } from "../config/env"

// // Configura el cliente de PostgreSQL
// const { USER, HOST, DATABASE, PASSWORD, PORT } = DB

// export const client = new pg.Client({
//   user: USER,
//   host: HOST,
//   database: DATABASE,
//   password: PASSWORD,
//   port: Number(PORT),
// })

import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

// async function createUser() {
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         user_id: "10",
//         user_name: "PEPE",
//         password: "1234",
//         avatar: "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg"
//       },
//     })
//     console.log("User created:", newUser)
//   } catch (error) {
//     console.error("Error creating user:", error)
//   } finally {
//     await prisma.$disconnect()
//   }
// }

// createUser()

// prisma.user.create({
//   data: {
//     user_id: "10",
//     user_name: "PEPE",
//     password: "1234",
//   },
// })

// await prisma.user.createMany ({
//   data: [
//     {
//       user_id: "1",
//       user_name: "peparda",
//        password: "8887",
//       avatar:
//         "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg",
//     },
//     {
//       user_id: "2",
//       user_name: "pepe",
//       password: "pepe1234",
//       avatar:
//         "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg",
//     },
//     {
//       user_id: "3",
//       user_name: "elma",
//       password: "tute",
//       avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWr2cGxyoLycYjH4lNBn7fsS8p-tNUFeZVjw&s",
//     },
//     {
//       user_id: "4",
//       user_name: "gust99",
//       password: "vivaLePep",
//       avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWr2cGxyoLycYjH4lNBn7fsS8p-tNUFeZVjw&s",
//     },
//   ],
// })
//
// await prisma.gif.createMany({
//   data: [
//     { gif_id: "5364668726146715938", gif_likes: 0 },
//     { gif_id: "6079604226118308780", gif_likes: 0 },
//     { gif_id: "2886510168956344697", gif_likes: 0 },
//   ],
// })
//
// await prisma.liked.createMany({
//   data: [
//     { user_id: "1", gif_id: "5364668726146715938" },
//     { user_id: "1", gif_id: "6079604226118308780" },
//     { user_id: "2", gif_id: "6079604226118308780" },
//     { user_id: "2", gif_id: "2886510168956344697" },
//   ],
// })
// //
// await prisma.comment.createMany({
//   data: [
//     {
//       comment_id: 1,
//       gif_id: "5364668726146715938",
//       user_id: "2",
//       text: "Qué gif de porquería.",
//     },
//     {
//       comment_id: 2,
//       gif_id: "5364668726146715938",
//       user_id: "2",
//       text: "Qué gif de porquería.",
//     },
//     {
//       comment_id: 3,
//       gif_id: "5364668726146715938",
//       user_id: "2",
//       text: "Qué gif de porquería.",
//     },
//     { comment_id: 1, gif_id: "6079604226118308780", user_id: "2", text: "Hermoso gif." },
//   ],
// })
