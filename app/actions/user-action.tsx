import { prisma } from "@/lib/prisma";

const dummyNotifications = [
  {
    id: "1",
    title: "Welcome!",
    message: "Welcome to VITS Passport Plus!",
    sentAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "2",
    title: "New Offer",
    message: "Check out our latest summer deals!",
    sentAt: "2023-06-05T14:30:00Z",
  },
  {
    id: "3",
    title: "Points Update",
    message: "You've earned 500 points on your recent stay!",
    sentAt: "2023-06-10T09:15:00Z",
  },
];

export const getNotifications = async () => {
  const res = await prisma.notification.findMany();
  return res;
};
