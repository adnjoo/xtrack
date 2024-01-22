/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "clerkUserId" TEXT;

-- CreateTable
CREATE TABLE "ClerkUser" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ClerkUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expense_clerkUserId_key" ON "Expense"("clerkUserId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
