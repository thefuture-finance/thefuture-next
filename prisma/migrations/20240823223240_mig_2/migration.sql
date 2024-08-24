/*
  Warnings:

  - You are about to drop the column `published` on the `SmartAccount` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_address_key";

-- AlterTable
ALTER TABLE "Account" ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "SmartAccount" DROP COLUMN "published",
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "Favorites" (
    "favoriteId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_favoriteId_key" ON "Favorites"("favoriteId");
