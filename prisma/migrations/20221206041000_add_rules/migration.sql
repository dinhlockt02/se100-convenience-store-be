-- CreateTable
CREATE TABLE `ProductItemQuantityStateRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stateName` VARCHAR(191) NOT NULL,
    `minVal` INTEGER NOT NULL,
    `maxVal` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductItemExpireStateRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stateName` VARCHAR(191) NOT NULL,
    `val` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
