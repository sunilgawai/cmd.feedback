"use server";
import {prisma} from "@/lib/prisma";
export const getAllUsers = async () => {
      const users = await prisma.users.findAll();

      return users;

}