/*
  Warnings:

  - Changed the type of `sex` on the `HealthMetric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fbs` on the `HealthMetric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exang` on the `HealthMetric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HealthMetric" DROP COLUMN "sex",
ADD COLUMN     "sex" INTEGER NOT NULL,
DROP COLUMN "fbs",
ADD COLUMN     "fbs" INTEGER NOT NULL,
DROP COLUMN "exang",
ADD COLUMN     "exang" INTEGER NOT NULL;
