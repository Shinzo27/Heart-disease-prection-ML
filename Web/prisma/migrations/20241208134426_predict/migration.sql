/*
  Warnings:

  - You are about to drop the column `target` on the `HealthMetric` table. All the data in the column will be lost.
  - Added the required column `prediction` to the `HealthMetric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthMetric" DROP COLUMN "target",
ADD COLUMN     "prediction" INTEGER NOT NULL;
