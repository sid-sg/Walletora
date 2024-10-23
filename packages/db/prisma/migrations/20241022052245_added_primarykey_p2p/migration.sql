/*
  Warnings:

  - Added the required column `status` to the `P2PTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "P2PStatus" AS ENUM ('Sent', 'Failure', 'Processing');

-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "status" "P2PStatus" NOT NULL,
ADD CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("id");
