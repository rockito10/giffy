/*
  Warnings:

  - You are about to drop the column `author` on the `gif` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `gif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `gif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gif" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL;
