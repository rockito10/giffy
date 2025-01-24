/*
  Warnings:

  - The `tags` column on the `custom_gif` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "custom_gif" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
