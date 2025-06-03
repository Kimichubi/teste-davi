/*
  Warnings:

  - Added the required column `vote` to the `PollResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pollresponse` ADD COLUMN `vote` INTEGER NOT NULL;
