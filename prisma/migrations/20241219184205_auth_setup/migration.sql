/*
  Warnings:

  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `Banner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BulkEmailJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BulkEmailResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[whatsapp]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BulkEmailJob" DROP CONSTRAINT "BulkEmailJob_userId_fkey";

-- DropForeignKey
ALTER TABLE "BulkEmailResult" DROP CONSTRAINT "BulkEmailResult_jobId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "unique_id" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "image" BYTEA,
ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "Banner";

-- DropTable
DROP TABLE "BulkEmailJob";

-- DropTable
DROP TABLE "BulkEmailResult";

-- DropTable
DROP TABLE "FormSubmission";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Logo";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "SocialMedia";

-- DropEnum
DROP TYPE "BulkEmailStatus";

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_whatsapp_key" ON "User"("whatsapp");
