/*
  Warnings:

  - You are about to drop the column `file_id` on the `Files` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_file_id_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "file_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
