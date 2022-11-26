/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `expireDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `Product` table. All the data in the column will be lost.
  - Added the required column `tax` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    DROP COLUMN `amount`,
    DROP COLUMN `cost`,
    DROP COLUMN `description`,
    DROP COLUMN `expireDate`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `vat`,
    ADD COLUMN `tax` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeliveryNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `providerId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductItem` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `deliveryNoteId` INTEGER NOT NULL,
    `MFG` DATETIME(3) NOT NULL,
    `EXP` DATETIME(3) NOT NULL,
    `cost` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceDetail` (
    `productItemId` VARCHAR(191) NOT NULL,
    `invoiceId` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`productItemId`, `invoiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToProvider` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToProvider_AB_unique`(`A`, `B`),
    INDEX `_ProductToProvider_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductItem` ADD CONSTRAINT `ProductItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductItem` ADD CONSTRAINT `ProductItem_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_productItemId_fkey` FOREIGN KEY (`productItemId`) REFERENCES `ProductItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProvider` ADD CONSTRAINT `_ProductToProvider_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProvider` ADD CONSTRAINT `_ProductToProvider_B_fkey` FOREIGN KEY (`B`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
