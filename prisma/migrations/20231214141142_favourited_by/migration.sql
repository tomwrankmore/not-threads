/*
  Warnings:

  - You are about to drop the column `postId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[favouritedById,favouritedPostId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `favouritedById` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favouritedPostId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_postId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_postId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "favouritedById" TEXT NOT NULL,
ADD COLUMN     "favouritedPostId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_favouritedById_favouritedPostId_key" ON "Favorite"("favouritedById", "favouritedPostId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_favouritedById_fkey" FOREIGN KEY ("favouritedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_favouritedPostId_fkey" FOREIGN KEY ("favouritedPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
