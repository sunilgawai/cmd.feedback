-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);
