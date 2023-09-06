-- CreateEnum
CREATE TYPE "Device" AS ENUM ('ALL', 'ANDROID', 'IOS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('ALL', 'MASCULINE', 'FEMININE', 'OTHER');

-- CreateTable
CREATE TABLE "Audience" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "device" "Device" NOT NULL,
    "gender" "Gender" NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "minScore" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "negative" BOOLEAN NOT NULL,
    "debug" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audience_pkey" PRIMARY KEY ("id")
);
