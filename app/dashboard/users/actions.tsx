"use server";
import { prisma } from "@/lib/prisma";

export const getAllUsers = async () => {
  try {
    const users = await prisma.users.findAll();
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
