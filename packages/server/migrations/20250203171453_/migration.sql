/*
  Warnings:

  - The primary key for the `custom_gif` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gif_id` on the `custom_gif` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `custom_gif` table. All the data in the column will be lost.
  - Added the required column `alt` to the `custom_gif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `custom_gif` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `custom_gif` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "custom_gif" DROP CONSTRAINT "custom_gif_pkey",
DROP COLUMN "gif_id",
DROP COLUMN "url",
ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD CONSTRAINT "custom_gif_pkey" PRIMARY KEY ("id");
