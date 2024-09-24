/*
  Warnings:

  - You are about to drop the column `userStatus` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin', 'super_admin');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userStatus",
ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "UserStatus";
