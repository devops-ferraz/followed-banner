/*
  Warnings:

  - You are about to drop the column `maxAge` on the `Audience` table. All the data in the column will be lost.
  - You are about to drop the column `maxScore` on the `Audience` table. All the data in the column will be lost.
  - You are about to drop the column `minAge` on the `Audience` table. All the data in the column will be lost.
  - You are about to drop the column `minScore` on the `Audience` table. All the data in the column will be lost.
  - Added the required column `max_age` to the `Audience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_score` to the `Audience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_age` to the `Audience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_score` to the `Audience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audience" DROP COLUMN "maxAge",
DROP COLUMN "maxScore",
DROP COLUMN "minAge",
DROP COLUMN "minScore",
ADD COLUMN     "max_age" INTEGER NOT NULL,
ADD COLUMN     "max_score" INTEGER NOT NULL,
ADD COLUMN     "min_age" INTEGER NOT NULL,
ADD COLUMN     "min_score" INTEGER NOT NULL;
