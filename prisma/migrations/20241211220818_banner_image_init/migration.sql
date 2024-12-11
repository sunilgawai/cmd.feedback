-- CreateTable
CREATE TABLE "BannerImages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerImage" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "bannerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BannerImage" ADD CONSTRAINT "BannerImage_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "BannerImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
