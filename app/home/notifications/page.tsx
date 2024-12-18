import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotifications } from "@/app/actions/user-action";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
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
