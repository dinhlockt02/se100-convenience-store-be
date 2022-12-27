/*
  Warnings:

  - The primary key for the `DeliveryNote` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ProductItem` DROP FOREIGN KEY `ProductItem_deliveryNoteId_fkey`;

-- AlterTable
ALTER TABLE `DeliveryNote` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProductItem` MODIFY `deliveryNoteId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductItem` ADD CONSTRAINT `ProductItem_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
