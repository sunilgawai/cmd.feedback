-- CreateTable
CREATE TABLE "HeroImage" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeroImage_pkey" PRIMARY KEY ("id")
);
