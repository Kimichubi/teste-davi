/*
  Warnings:

  - A unique constraint covering the columns `[urlToEdit]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Poll_urlToEdit_key` ON `Poll`(`urlToEdit`);
