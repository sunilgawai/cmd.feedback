"use server";
import { prisma } from "@/lib/prisma";

export const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (err:any) {
    throw new Error(err);
  }
};
