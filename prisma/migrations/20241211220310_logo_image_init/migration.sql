/*
  Warnings:

  - You are about to drop the `Hero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Hero";

-- CreateTable
CREATE TABLE "LogoImage" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogoImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loyalty" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cafeVisits" VARCHAR(100) NOT NULL,
    "preferredVisitTime" TEXT NOT NULL,
    "usuallyOrdered" TEXT NOT NULL,
    "averageBillValue" TEXT NOT NULL,
    "partOfAnyOtherProgram" TEXT NOT NULL,
    "likeToEarnRewardPoints" BOOLEAN NOT NULL,
    "howImportant" TEXT NOT NULL,
    "preferEarningCashback" TEXT NOT NULL,
    "interestedInMembership" TEXT NOT NULL,
    "willParticipate" TEXT NOT NULL,
    "preferSubscription" TEXT NOT NULL,
    "likePersonalizedRecommendations" TEXT NOT NULL,
    "interestedInGifting" TEXT NOT NULL,
    "preferNotifications" TEXT NOT NULL,
    "valueExperiences" TEXT NOT NULL,
    "currentWallet" TEXT NOT NULL,
    "flexibilityToPreload" TEXT NOT NULL,
    "preferCashback" TEXT NOT NULL,
    "wantedFeature" TEXT,
    "wantToPayAnisClub" TEXT NOT NULL,

    CONSTRAINT "loyalty_pkey" PRIMARY KEY ("id")
);
