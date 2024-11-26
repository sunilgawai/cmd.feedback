"use server";

import { prisma } from "@/lib/prisma";

export const getDashboardStats = async () => {
  const agents = await prisma.agent.findMany();

  return { agents };
};
