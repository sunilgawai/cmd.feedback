"use client";

import { useState } from "react";
import { ChevronRight, Gift, User2, Mail, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "VITS Star",
    email: "vitsstar@example.com",
    phoneNumber: "+1234567890",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Updated user data:", userData);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <Gift className="w-8 h-8 text-pink-600" />
        </div>
        <h2 className="text-xl font-semibold">{userData.name}</h2>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Personal Details
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User2 className="w-5 h-5" />
                {isEditing ? (
                  <div className="flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <span>{userData.name}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                {isEditing ? (
                  <div className="flex-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <span>{userData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                {isEditing ? (
                  <div className="flex-1">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <span>{userData.phoneNumber}</span>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5" />
                  <div className="flex-1">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              )}
            </div>
            {isEditing && (
              <Button type="submit" className="mt-4">
                Save Changes
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button variant="ghost" className="w-full justify-between h-auto py-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="font-medium">Transactions</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
