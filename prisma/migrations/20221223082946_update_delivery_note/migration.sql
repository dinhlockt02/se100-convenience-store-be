/*
  Warnings:

  - Added the required column `shipper` to the `DeliveryNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DeliveryNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DeliveryNote` ADD COLUMN `shipper` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
