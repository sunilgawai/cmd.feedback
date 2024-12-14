-- CreateEnum
CREATE TYPE "BulkEmailStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "EmailSendStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "BulkEmailJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalEmails" INTEGER NOT NULL,
    "sentEmails" INTEGER NOT NULL DEFAULT 0,
    "failedEmails" INTEGER NOT NULL DEFAULT 0,
    "status" "BulkEmailStatus" NOT NULL DEFAULT 'PENDING',
    "fileOriginalName" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "BulkEmailJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BulkEmailResult" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "EmailSendStatus" NOT NULL,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BulkEmailResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BulkEmailJob" ADD CONSTRAINT "BulkEmailJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkEmailResult" ADD CONSTRAINT "BulkEmailResult_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "BulkEmailJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
