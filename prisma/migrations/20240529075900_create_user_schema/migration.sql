-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Buyer', 'Seller');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Buyer';

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "book" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "file_id" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
