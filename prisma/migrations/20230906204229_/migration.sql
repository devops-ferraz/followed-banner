-- CreateEnum
CREATE TYPE "Device" AS ENUM ('ALL', 'ANDROID', 'IOS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('ALL', 'MASCULINE', 'FEMININE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "campaign_url" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "final_date" TEXT NOT NULL,
    "daily_limit" DOUBLE PRECISION NOT NULL,
    "haveLimit_daily" BOOLEAN NOT NULL,
    "limit_cpc" DOUBLE PRECISION NOT NULL,
    "haveLimit_cpc" BOOLEAN NOT NULL,
    "campaign_value" DOUBLE PRECISION NOT NULL,
    "image_path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audience" (
    "id" TEXT NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "min_score" INTEGER NOT NULL,
    "max_score" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "negative" BOOLEAN NOT NULL,
    "debug" BOOLEAN NOT NULL,
    "device" "Device" NOT NULL,
    "gender" "Gender" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignAudience" (
    "id_campaign" TEXT NOT NULL,
    "id_audience" TEXT NOT NULL,

    CONSTRAINT "CampaignAudience_pkey" PRIMARY KEY ("id_campaign","id_audience")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CampaignAudience" ADD CONSTRAINT "CampaignAudience_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignAudience" ADD CONSTRAINT "CampaignAudience_id_audience_fkey" FOREIGN KEY ("id_audience") REFERENCES "Audience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
