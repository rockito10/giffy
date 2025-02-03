/*
  Warnings:

  - Changed the type of `images` on the `gif` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "gif" DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;
