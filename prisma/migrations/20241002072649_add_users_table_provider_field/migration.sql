-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('email', 'google');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "Providers" NOT NULL DEFAULT 'email';
