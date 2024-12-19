"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { sendEmail, sendWelcomeEmail } from "@/lib/emails";
import WelcomeEmail from "@/emails/welcome-email";
import { createElement } from "react";

function generatePassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// async function sendWelcomeEmail(email: string, name: string, password: string) {
//   try {
//     await sendEmail({
//       to: email,
//       subject: "Welcome to Our Platform",
//       // template: WelcomeEmail,
//       // @ts-ignore
//       template: createElement(WelcomeEmail, { name, email, password }),
//       props: {
//         name,
//         email,
//         password,
//       },
//     });
//   } catch (error) {
//     console.error("Failed to send email:", error);
//     // You might want to handle this error (e.g., retry sending email or notify admin)
//   }
// }

export async function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location?: string;
}) {
  const { name, email, phone, whatsapp, location } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const existingNumber = await prisma.user.findUnique({ where: { phoneNumber: phone } });
  if (existingNumber) {
    throw new Error("Phone number already exists");
  }

  // Generate a random password
  const password = generatePassword();
  const hashedPassword = await hash(password, 10);

  // Create user in the database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber: phone,
      //   whatsapp,
      password: hashedPassword,
      //   unique_id: location,
    },
  });
  console.log("User created:", user);

  // Send welcome email with login credentials
  await sendWelcomeEmail(email, name, password);

  return { success: true, message: "User registered successfully" };
}
