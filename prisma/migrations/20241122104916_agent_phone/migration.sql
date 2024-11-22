/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `agent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `agent_phone_key` ON `agent`(`phone`);
