"use server"
import { prisma } from "@/lib/prisma";

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
}

// Notifications

export const createNotification = async ({title,message}: {
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