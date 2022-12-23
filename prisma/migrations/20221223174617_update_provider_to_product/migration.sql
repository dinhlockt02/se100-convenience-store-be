-- CreateTable
CREATE TABLE `ProvidersOnProducts` (
    `providerId` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`providerId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProvidersOnProducts` ADD CONSTRAINT `ProvidersOnProducts_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProvidersOnProducts` ADD CONSTRAINT `ProvidersOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
