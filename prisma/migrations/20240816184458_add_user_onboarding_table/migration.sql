/*
  Warnings:

  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserOnboardingStepStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AuthenticationMethodType" AS ENUM ('EMAIL_PASSWORD');

-- CreateEnum
CREATE TYPE "AuthenticationMethodStatus" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "users_onboardings_verification_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userOnboardingId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_onboardings_verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_onboardings" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" UUID,
    "verification_code" "UserOnboardingStepStatus" NOT NULL DEFAULT 'PENDING',
    "info" "UserOnboardingStepStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_onboardings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_onboardings_user_id_key" ON "user_onboardings"("user_id");

-- AddForeignKey
ALTER TABLE "users_onboardings_verification_codes" ADD CONSTRAINT "users_onboardings_verification_codes_userOnboardingId_fkey" FOREIGN KEY ("userOnboardingId") REFERENCES "user_onboardings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_onboardings" ADD CONSTRAINT "user_onboardings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
