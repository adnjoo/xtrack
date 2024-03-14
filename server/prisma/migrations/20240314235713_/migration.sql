-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL,
    "dateEnded" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "ClerkUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
