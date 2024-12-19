"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Optional: Only if you're dealing with passwords
import { sendEmail, sendWelcomeEmail } from "@/lib/emails";
import MagicLinkEmail from "@/emails/magic-link-email";
// import { hash } from "bcrypt";

import { nanoid } from "nanoid"; // For generating random identifiers
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300 });
import fs from "fs";
import path from "path";

export async function saveLoyaltyForm(validatedData: any) {
  try {
    const savedLoyalty = await prisma.loyalty.create({
      data: {
        name: validatedData.name,
        cafeVisits: validatedData.cafe_visits,
        preferredVisitTime: validatedData.preffered_visit_time,
        usuallyOrdered: validatedData.usually_ordered,
        averageBillValue: validatedData.average_bill_value,
        partOfAnyOtherProgram: validatedData.part_of_any_other_proggram,
        likeToEarnRewardPoints:
          validatedData.like_to_earn_reward_points === "yes" ? true : false,
        howImportant: validatedData.how_important,
        preferEarningCashback: validatedData.prefer_earning_cashback,
        interestedInMembership: validatedData.interested_in_membership,
        willParticipate: validatedData.will_participate,
        preferSubscription: validatedData.prefer_subscription,
        likePersonalizedRecommendations:
          validatedData.like_personalized_recommendations,
        interestedInGifting: validatedData.interested_in_gifting,
        preferNotifications: validatedData.prefer_notifications,
        valueExperiences: validatedData.value_experiences,
        currentWallet: validatedData.current_wallet,
        flexibilityToPreload: validatedData.flexibility_to_preload,
        preferCashback: validatedData.prefer_cashback,
        wantedFeature: validatedData.wanted_feature || null,
        wantToPayAnisClub: validatedData.want_to_pay_anis_club,
      },
    });
    return savedLoyalty;
  } catch (error) {
    throw error;
  }
}

export const getLoyaltyData = async (id: any) => {
  try {
    const savedLoyalty = await prisma.loyalty.findUnique({ where: { id: id } });
    return savedLoyalty;
  } catch (error) {
    throw error;
  }
};

export async function saveImageToDB(image: { path: string; preview: string }) {
  try {
    // Read the file as binary from the local filesystem
    const filePath = path.resolve(process.cwd(), image.path); // Adjust the path if necessary
    const fileBuffer = fs.readFileSync(filePath);

    // Save the binary file to the database
    await prisma.heroImage.create({
      data: {
        image: fileBuffer, // Store binary data in the database
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image to the database.");
  }
}

export async function getHeroImage() {
  try {
    const heroImage = await prisma.heroImage.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (heroImage) {
      // Convert Uint8Array to Base64 string
      const base64Image = Buffer.from(heroImage.image).toString("base64");
      return {
        ...heroImage,
        image: base64Image,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return null;
  }
}

export const getAppLogo = async () => {
  try {
    const image = await prisma.logoImage.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (image) {
      // Convert Uint8Array to Base64 string
      const base64Image = Buffer.from(image.image).toString("base64");
      return {
        ...image,
        image: base64Image,
      };
    }
  } catch (error) {
    throw Error(error);
  }
};

export const deleteAllBanners = async () => {
  try {
    // Delete all BannerImage entries
    await prisma.bannerImage.deleteMany();

    // Delete all BannerImages entries
    await prisma.bannerImages.deleteMany();
  } catch (error) {
    console.error("Error deleting all banners:", error);
    throw new Error("Failed to delete all banners.");
  }
};

export const deleteAllMenus = async () => {
  try {
    // Delete all BannerImage entries
    await prisma.menuImage.deleteMany();

    // Delete all BannerImages entries
    await prisma.menuImages.deleteMany();
  } catch (error) {
    console.error("Error deleting all menus:", error);
    throw new Error("Failed to delete all menus.");
  }
};

type ImagesType = {
  images: {
    image: string;
    id: number;
    createdAt: Date;
    bannerId: number;
  }[];
  id: number;
  createdAt: Date;
};
export async function getBannerImages() {
  const cachedBanners: ImagesType = cache.get("bannerImages");
  console.log("cachedBanners", cachedBanners);
  if (cachedBanners) {
    return cachedBanners;
  }
  try {
    const bannerImages = await prisma.bannerImages.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
      },
    });

    // if (bannerImages) {
    //   return {
    //     ...bannerImages,
    //     images: bannerImages.images.map((img) => ({
    //       ...img,
    //       image: Buffer.from(img.image).toString("base64"),
    //     })),
    //   };
    // }
    if (bannerImages) {
      const processedImages = {
        ...bannerImages,
        images: bannerImages.images.map((img) => ({
          ...img,
          image: Buffer.from(img.image).toString("base64"),
        })),
      };
      cache.set("bannerImages", processedImages); // Cache the processed images
      return processedImages;
    }

    return {
      images: [],
    };
  } catch (error) {
    console.error("Error fetching banner images:", error);
    return null;
  }
}

export async function getMenuImages() {
  try {
    const menuImages = await prisma.menuImages.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
      },
    });

    if (menuImages) {
      return {
        ...menuImages,
        images: menuImages.images.map((img) => ({
          ...img,
          image: Buffer.from(img.image).toString("base64"),
        })),
      };
    }

    return {
      images: [],
    };
  } catch (error) {
    console.error("Error fetching banner images:", error);
    return null;
  }
}
// Dashboard

export const getDashboardOverview = async () => {
  const totalCustomers = await prisma.user.count();
  const totalVouchers = await prisma.voucher.count();
  const totalOffers = await prisma.offer.count();
  const notifications = await prisma.notification.count();
  const banners = 0o0;

  return {
    totalCustomers,
    totalVouchers,
    totalOffers,
    notifications,
    banners,
  };
};

export const createVoucher = async (values: {
  code: string;
  description: string;
  validFrom: Date;
  validTo: Date;
}) => {
  await prisma.voucher.create({
    data: {
      code: values.code,
      description: values.description,
      validFrom: values.validFrom,
      validTo: values.validTo,
      user: { connect: { id: "cm4h92ifj000026p7u5k2j8ts" } },
    },
  });
};

export const deleteVoucher = async (id: string) => {
  const res = await prisma.voucher.delete({ where: { id: id } });
  return res;
};

export const getAllVouchers = async () => {
  return await prisma.voucher.findMany();
};

export const getCustomerById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id: id } });
};

export const updateCustomerData = async (values: {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | undefined;
}) => {
  await prisma.user.update({
    where: { id: values.id },
    data: {
      ...values,
      // role: "ADMIN",
    },
  });
};

export const deleteCustomer = async (id: string) => {
  await prisma.user.delete({ where: { id: id } });
};

// Offers

export const createOffer = async (values: {
  title: string;
  description: string;
  validFrom: Date;
  validTo: Date;
}) => {
  const res = await prisma.offer.create({
    data: values,
  });
  return res;
};

export const deleteOffer = async (id: string) => {
  const res = await prisma.offer.delete({ where: { id: id } });
  return res;
};

export const getAllOffers = async () => {
  return await prisma.offer.findMany();
};

// Notifications

export const createNotification = async ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  await prisma.notification.create({
    data: {
      title,
      message,
      user: { connect: { id: "cm4h92ifj000026p7u5k2j8ts" } },
    },
  });
};

export const getAllNotifications = async () => {
  return await prisma.notification.findMany();
};

export const deleteNotification = async (id: string) => {
  const res = await prisma.offer.delete({ where: { id: id } });
  return res;
};

// Banners

export const createBanners = async () => {
  // return await prisma.
};

// User
export async function submitFirstForm(data: {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location?: string;
}) {
  const { name, email, phone, whatsapp, location } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Generate a random password
  const password = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber: phone,
      password: hashedPassword,
      role: "CUSTOMER",
      ...(whatsapp && { whatsapp }),
      ...(location && { location }),
    },
  });

  // Send welcome email with login link
  await sendWelcomeEmail(user.email, user.name, password);

  return user;
}

// export const submitFirstForm = async (values: {
//   name: string;
//   email: string;
//   phone: string;
//   wing?: string | undefined;
// }) => {
//   const { name, email, phone, wing } = values;

//   // Check if user already exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   // if (existingUser) {
//   //   throw new Error("User with this email already exists");
//   // }

//   // Save the user to the database
//   // const user = await prisma.user.create({
//   //   data: {
//   //     name,
//   //     email,
//   //     phoneNumber: phone,
//   //     password: null, // If you're only using email magic links
//   //     // wing, // Optional field
//   //   },
//   // });

//   // Create a magic link token
//   const token = nanoid(); // You can generate a token for the magic link

//   // Save the token and link expiration in the database
//   await prisma.verificationToken.create({
//     data: {
//       identifier: email,
//       token,
//       expires: new Date(Date.now() + 60 * 60 * 1000), // Set expiry to 1 hour
//     },
//   });

//   // Send magic link email to user
//   const loginUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?token=${token}&email=${email}`;
//   await sendEmail({
//     to: email,
//     subject: "Sign in to Your Account",
//     template: MagicLinkEmail,
//     props: {
//       loginUrl,
//       email,
//     },
//   });

//   return true;
// };
