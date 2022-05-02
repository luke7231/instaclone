/*
  Warnings:

  - A unique constraint covering the columns `[hashtag]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "caption" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashtag_unique" ON "Hashtag"("hashtag");
