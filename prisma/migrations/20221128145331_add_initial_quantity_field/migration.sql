/*
  Warnings:

  - Added the required column `initialQuantity` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductItem` ADD COLUMN `initialQuantity` INTEGER NOT NULL;
