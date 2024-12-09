"use server";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs"; // Optional: Only if you're dealing with passwords
import { sendEmail } from "@/lib/emails";
import MagicLinkEmail from "@/emails/magic-link-email";

import { nanoid } from "nanoid"; // For generating random identifiers

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
      user: { connect: { id: "cm4fro8hi0000fjzdb5zoueem" } },
    },
  });
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
    data: values,
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
  await prisma.offer.create({
    data: values,
  });
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
      user: { connect: { id: "cm4fro8hi0000fjzdb5zoueem" } },
    },
  });
};

export const getAllNotifications = async () => {
  return await prisma.notification.findMany();
};

// Banners

export const createBanners = async () => {
  // return await prisma.
};

// User

export const submitFirstForm = async (values: {
  name: string;
  email: string;
  phone: string;
  wing?: string | undefined;
}) => {
  const { name, email, phone, wing } = values;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  // if (existingUser) {
  //   throw new Error("User with this email already exists");
  // }

  // Save the user to the database
  // const user = await prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     phoneNumber: phone,
  //     password: null, // If you're only using email magic links
  //     // wing, // Optional field
  //   },
  // });

  // Create a magic link token
  const token = nanoid(); // You can generate a token for the magic link

  // Save the token and link expiration in the database
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 60 * 60 * 1000), // Set expiry to 1 hour
    },
  });

  // Send magic link email to user
  const loginUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?token=${token}&email=${email}`;
  await sendEmail({
    to: email,
    subject: "Sign in to Your Account",
    template: MagicLinkEmail,
    props: {
      loginUrl,
      email,
    },
  });

  return true;
};
