/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `productId` on the `ProductItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `ProvidersOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `productId` on the `ProvidersOnProducts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `A` on the `_ProductToProvider` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `ProductItem` DROP FOREIGN KEY `ProductItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProvidersOnProducts` DROP FOREIGN KEY `ProvidersOnProducts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToProvider` DROP FOREIGN KEY `_ProductToProvider_A_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProductItem` MODIFY `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProvidersOnProducts` DROP PRIMARY KEY,
    MODIFY `productId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`providerId`, `productId`);

-- AlterTable
ALTER TABLE `_ProductToProvider` MODIFY `A` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProvidersOnProducts` ADD CONSTRAINT `ProvidersOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductItem` ADD CONSTRAINT `ProductItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProvider` ADD CONSTRAINT `_ProductToProvider_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
