-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'TECH');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assignedToUserId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
