/*
  Warnings:

  - The values [SUPERADMIN,WITHDRAW_AGENT] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUPERADMIN,WITHDRAW_AGENT] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agent` ADD COLUMN `adminCommission` INTEGER NULL,
    ADD COLUMN `assignAdmin` VARCHAR(191) NULL,
    ADD COLUMN `averageAcceptTime` DOUBLE NULL,
    ADD COLUMN `binanceId` VARCHAR(191) NULL,
    ADD COLUMN `commision_rate` DOUBLE NULL,
    ADD COLUMN `contactNumber` BIGINT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `distributedAmount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `isNewAccount` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isOnline` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastlogin` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `mysteryBoxPoint` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `negativePoints` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `positivePoints` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `referUsers` VARCHAR(191) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `todayAverageAcceptTime` DOUBLE NULL,
    ADD COLUMN `todayDistributedAmount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `todayNegativePoints` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `todayPositivePoints` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `todayTotalAcceptTime` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `todayTotalRequest` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalAcceptTime` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalRequest` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `upiId` VARCHAR(191) NULL,
    ADD COLUMN `wallet` VARCHAR(191) NULL,
    ADD COLUMN `walletBalance` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `walletId` VARCHAR(191) NULL,
    MODIFY `role` ENUM('AGENT', 'SUPER_ADMIN', 'SELLER_AGENT', 'WITHDRAWER_AGENT') NULL DEFAULT 'AGENT';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('AGENT', 'SUPER_ADMIN', 'SELLER_AGENT', 'WITHDRAWER_AGENT') NULL DEFAULT 'AGENT';

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `agentId` VARCHAR(191) NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
