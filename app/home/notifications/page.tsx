import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function NotificationsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      {dummyNotifications.length > 0 ? (
        <div className="space-y-4">
          {dummyNotifications.map((notification) => (
            <Card key={notification.id}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {notification.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(notification.sentAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No notifications available</p>
      )}
    </div>
  );
}
