/*
  Warnings:

  - Changed the type of `tags` on the `custom_gif` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "custom_gif" DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL;
