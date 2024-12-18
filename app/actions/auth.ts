"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
  };
}

export async function signup({
  name,
  email,
  password,
  phoneNumber,
}: {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}) {
  // Check if email is already in use
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUserByEmail) {
    throw new Error("Email is already in use");
  }

  // Check if phone number is already in use (if provided)
  if (phoneNumber) {
    const existingUserByPhone = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    if (existingUserByPhone) {
      throw new Error("Phone number is already in use");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    },
  });

  // Here you would typically create a session or JWT token
  return { id: user.id, name: user.name, email: user.email };
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  // Here you would typically send an email with reset instructions
  console.log(`Send password reset email to ${email}`);
}

export async function forgotEmail(phoneNumber: string) {
  const user = await prisma.user.findUnique({ where: { phoneNumber } });
  if (!user) throw new Error("User not found");

  return user.email;
}
