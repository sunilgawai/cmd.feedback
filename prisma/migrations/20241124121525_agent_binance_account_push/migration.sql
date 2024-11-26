-- CreateTable
CREATE TABLE `binanceAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agentId` INTEGER NOT NULL,
    `binanceNetwork` VARCHAR(191) NOT NULL,
    `binanceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `binanceAccount_binanceId_key`(`binanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `binanceAccount` ADD CONSTRAINT `binanceAccount_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
