/*
  Warnings:

  - The primary key for the `gif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gif_id` on the `gif` table. All the data in the column will be lost.
  - You are about to drop the column `gif_likes` on the `gif` table. All the data in the column will be lost.
  - You are about to drop the `custom_gif` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alt` to the `gif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `gif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `gif` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `gif` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `gif` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_gif_id_fkey";

-- DropForeignKey
ALTER TABLE "liked" DROP CONSTRAINT "liked_gif_id_fkey";

-- AlterTable
ALTER TABLE "gif" DROP CONSTRAINT "gif_pkey",
DROP COLUMN "gif_id",
DROP COLUMN "gif_likes",
ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "gif_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "custom_gif";

-- CreateTable
CREATE TABLE "gif_interactions" (
    "gif_id" TEXT NOT NULL,
    "gif_likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "gif_interactions_pkey" PRIMARY KEY ("gif_id")
);

-- AddForeignKey
ALTER TABLE "liked" ADD CONSTRAINT "liked_gif_id_fkey" FOREIGN KEY ("gif_id") REFERENCES "gif_interactions"("gif_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_gif_id_fkey" FOREIGN KEY ("gif_id") REFERENCES "gif_interactions"("gif_id") ON DELETE CASCADE ON UPDATE CASCADE;
