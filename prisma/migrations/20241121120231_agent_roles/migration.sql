-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('AGENT', 'SUPERADMIN', 'SELLER_AGENT', 'WITHDRAW_AGENT') NULL DEFAULT 'AGENT';

-- CreateTable
CREATE TABLE `agent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `role` ENUM('AGENT', 'SUPERADMIN', 'SELLER_AGENT', 'WITHDRAW_AGENT') NULL DEFAULT 'AGENT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `abbetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `num` VARCHAR(20) NOT NULL,
    `clo` VARCHAR(21) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `abbetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `abperiod` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `period` BIGINT NOT NULL,
    `num` INTEGER NULL,
    `nxt` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(211) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(211) NOT NULL DEFAULT 'Applying',
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aviset` (
    `id` INTEGER NOT NULL,
    `nxt` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beconebet` (
    `TIME` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beconebetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `num` VARCHAR(20) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beconebetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` BIGINT NOT NULL,
    `ans` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `price` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beconeperiod` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`period`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bet` (
    `TIME` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `betrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `num` VARCHAR(20) NOT NULL,
    `clo` TINYTEXT NOT NULL,
    `res1` VARCHAR(211) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `betting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `price` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `color` TEXT NOT NULL,
    `am` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `color2` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bonus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `giver` BIGINT NOT NULL,
    `usercode` VARCHAR(255) NOT NULL,
    `amount` FLOAT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(12) NOT NULL,
    `Ticket` VARCHAR(211) NOT NULL,
    `Support` VARCHAR(211) NOT NULL,
    `Transaction` VARCHAR(211) NOT NULL,
    `refno` VARCHAR(211) NOT NULL,
    `Description` VARCHAR(211) NOT NULL,
    `Amount` INTEGER NULL,
    `PaidTo` VARCHAR(211) NOT NULL,
    `UTR` VARCHAR(211) NOT NULL,
    `account` VARCHAR(211) NOT NULL,
    `ifsc` VARCHAR(211) NOT NULL,
    `Mode` VARCHAR(211) NOT NULL,
    `Resolution` VARCHAR(211) NOT NULL,
    `Status` VARCHAR(211) NOT NULL DEFAULT 'processing',
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `screenshot` VARCHAR(211) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crashbetrecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(211) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(211) NOT NULL DEFAULT 'pending',
    `winpoint` VARCHAR(211) NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crashgamerecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crashpoint` VARCHAR(211) NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `democrashbetrecord` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(211) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(211) NOT NULL DEFAULT 'pending',
    `winpoint` VARCHAR(211) NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `democrashgamerecord` (
    `id` INTEGER NOT NULL,
    `crashpoint` VARCHAR(211) NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emredbet` (
    `TIME` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emredbetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `num` VARCHAR(20) NOT NULL,
    `clo` TINYTEXT NOT NULL,
    `res1` VARCHAR(211) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emredbetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `price` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `color` TEXT NOT NULL,
    `am` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `color2` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emredperiod` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `share` INTEGER NOT NULL,
    `code` VARCHAR(211) NOT NULL,
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giftrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(211) NOT NULL,
    `username` VARCHAR(211) NOT NULL,
    `amount` INTEGER NOT NULL,
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `help` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(211) NOT NULL,
    `outid` INTEGER NOT NULL,
    `whatsapp` VARCHAR(211) NOT NULL,
    `des` LONGTEXT NOT NULL,
    `status` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(211) NOT NULL,
    `period` VARCHAR(211) NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `win` FLOAT NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mine_setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `minserver9` INTEGER NOT NULL DEFAULT 0,
    `minserver16` INTEGER NOT NULL DEFAULT 0,
    `minserver64` INTEGER NOT NULL DEFAULT 0,
    `maxserver9` INTEGER NOT NULL DEFAULT 9,
    `maxserver16` INTEGER NOT NULL DEFAULT 16,
    `maxserver64` INTEGER NOT NULL DEFAULT 64,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notice` VARCHAR(255) NOT NULL DEFAULT 'Invite members to recharge 300 rupees to get bonus 100 rupees. About Recharge and withdrawal,contact customer care',
    `upi` VARCHAR(211) NULL,
    `upi1` VARCHAR(211) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` INTEGER NOT NULL,
    `api` VARCHAR(412) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `period` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `recharge` DOUBLE NOT NULL,
    `status` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `upi` VARCHAR(211) NOT NULL,
    `utr` VARCHAR(255) NOT NULL,
    `rand` VARCHAR(211) NOT NULL,

    UNIQUE INDEX `utr`(`utr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `withdraw` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'Applying',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rand` VARCHAR(211) NOT NULL,
    `upi` VARCHAR(211) NOT NULL,
    `name` VARCHAR(211) NOT NULL,
    `bankname` VARCHAR(211) NOT NULL,
    `account` VARCHAR(15) NULL,
    `ifsc` VARCHAR(115) NULL,
    `note` VARCHAR(211) NOT NULL DEFAULT 'Payment failed',
    `type` VARCHAR(12) NOT NULL DEFAULT 'normal',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saprebet` (
    `TIME` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saprebetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `num` VARCHAR(20) NOT NULL,
    `clo` TINYTEXT NOT NULL,
    `res1` VARCHAR(211) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saprebetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `price` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `number` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `color` TEXT NOT NULL,
    `am` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `color2` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sapreperiod` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recharge` INTEGER NOT NULL DEFAULT 200,
    `withdraw` INTEGER NOT NULL DEFAULT 330,
    `bonus` INTEGER NOT NULL DEFAULT 100,
    `telegroup` VARCHAR(211) NULL,
    `support` VARCHAR(211) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `signin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(211) NOT NULL,
    `created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(15) NULL,
    `reason` VARCHAR(150) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type` VARCHAR(11) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(10) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refcode` VARCHAR(255) NOT NULL,
    `usercode` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `balance` DOUBLE NOT NULL DEFAULT 0.00,
    `account` BIGINT NOT NULL DEFAULT 1111111111,
    `ifsc` VARCHAR(255) NOT NULL DEFAULT 'Not Addeed',
    `withdraw` INTEGER NOT NULL,
    `refcode1` VARCHAR(11) NOT NULL,
    `refcode2` VARCHAR(11) NOT NULL,
    `name` VARCHAR(211) NOT NULL,
    `upi` VARCHAR(211) NOT NULL,
    `nickname` VARCHAR(211) NOT NULL DEFAULT 'User',
    `bonus` FLOAT NOT NULL DEFAULT 0,
    `r_ip` VARCHAR(211) NULL,
    `bankname` VARCHAR(211) NOT NULL,
    `state` VARCHAR(211) NOT NULL,
    `city` VARCHAR(211) NOT NULL,
    `address` VARCHAR(511) NOT NULL,
    `mobile` VARCHAR(211) NOT NULL,
    `email` VARCHAR(211) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `ip` VARCHAR(211) NULL,
    `waggering` FLOAT NOT NULL DEFAULT 0,
    `paytm` VARCHAR(211) NOT NULL,
    `demobalance` INTEGER NOT NULL DEFAULT 0,
    `token` VARCHAR(211) NOT NULL,
    `signuptask` BOOLEAN NOT NULL DEFAULT false,
    `rechargetask` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` BIGINT NOT NULL,
    `otp` INTEGER NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vipbet` (
    `TIME` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vipbetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `clo` TINYTEXT NOT NULL,
    `num` VARCHAR(11) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vipbetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` VARCHAR(255) NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `fres` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vipperiod` (
    `id` INTEGER NOT NULL DEFAULT 0,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wheelbetrec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` BIGINT NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `clo` TINYTEXT NOT NULL,
    `num` VARCHAR(11) NOT NULL,
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wheelbetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(225) NOT NULL,
    `period` VARCHAR(255) NOT NULL,
    `ans` VARCHAR(11) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `res` VARCHAR(255) NOT NULL DEFAULT 'wait',
    `fres` VARCHAR(211) NOT NULL DEFAULT 'wait',
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wheelperiod` (
    `id` INTEGER NOT NULL DEFAULT 0,
    `period` BIGINT NOT NULL,
    `nxt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
