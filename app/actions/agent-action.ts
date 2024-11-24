"use server";

import { prisma } from "@/lib/prisma";
import { agent, Role } from "@prisma/client";

type Agent = {
  username: string;
  password: string;
  phone: string;
  role: Role;
};

export const getAgentById = async (id: number) => {
  try {
      const agent = await prisma.agent.findUnique({
        where: {
          id: id
        }
      });
      return agent;
  } catch (error:any) {
      throw Error(error);
  }
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

type EditAgentProps = { id: number } & Agent;
export const editAgent = async ({id, username, phone, role}: EditAgentProps) => {
  try {
    const agent = await prisma.agent.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        phone: phone,
        role: role
      }
    });
    return agent;
  } catch (error: any) {
    throw Error(error);
  }
};