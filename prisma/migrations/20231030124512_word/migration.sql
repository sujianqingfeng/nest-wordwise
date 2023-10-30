/*
  Warnings:

  - You are about to drop the column `text` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "text",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "word" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Word_userId_key" ON "Word"("userId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
