/*
  Warnings:

  - The primary key for the `LastVisited` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_placeId_fkey";

-- DropForeignKey
ALTER TABLE "LastVisited" DROP CONSTRAINT "LastVisited_placeId_fkey";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "placeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LastVisited" DROP CONSTRAINT "LastVisited_pkey",
ALTER COLUMN "placeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LastVisited_pkey" PRIMARY KEY ("userId", "placeId");

-- AlterTable
ALTER TABLE "Place" DROP CONSTRAINT "Place_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Place_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Place_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastVisited" ADD CONSTRAINT "LastVisited_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
