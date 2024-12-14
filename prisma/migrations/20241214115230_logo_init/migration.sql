-- CreateTable
CREATE TABLE "MenuImages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuImage" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "menuId" INTEGER NOT NULL,

    CONSTRAINT "MenuImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppLogo" (
    "id" SERIAL NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppLogo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuImage" ADD CONSTRAINT "MenuImage_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "MenuImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
