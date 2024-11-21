"use server";

import { prisma } from "@/lib/prisma";
import { agent, Role } from "@prisma/client";

type Agent = {
  username: string;
  password: string;
  phone: string;
  role: Role;
};
export const registerAgent = async (data: Agent) => {
  try {
      const agent = await prisma.agent.create({
        data: data,
      });
      return agent;
  } catch (error:any) {
      throw Error(error);
  }
};
