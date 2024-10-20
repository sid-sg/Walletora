/*
  Warnings:

  - You are about to drop the column `locked` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "locked",
ALTER COLUMN "amount" SET DEFAULT 0;
