/*
  Warnings:

  - You are about to drop the column `favouritedById` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `favouritedPostId` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_favouritedById_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_favouritedPostId_fkey";

-- DropIndex
DROP INDEX "Favorite_favouritedById_favouritedPostId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "favouritedById",
DROP COLUMN "favouritedPostId",
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_postId_key" ON "Favorite"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
