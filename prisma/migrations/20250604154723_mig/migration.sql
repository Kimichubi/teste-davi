/*
  Warnings:

  - Added the required column `urlToEdit` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poll` ADD COLUMN `urlToEdit` VARCHAR(191) NOT NULL;
