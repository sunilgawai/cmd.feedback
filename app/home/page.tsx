import { Metadata } from "next";
import { VoucherSection } from "./_components/voucher-section";
import { OfferSection } from "./_components/offer-section";
import { PersonalDetailsForm } from "./_components/personal-details-form";
import { SettingsSection } from "./_components/settings-section";

export const metadata: Metadata = {
  title: "Dashboard | Your App Name",
  description: "View your vouchers, offers, and manage your account",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <VoucherSection />
        <OfferSection />
      </div>
      <PersonalDetailsForm />
      <SettingsSection />
    </div>
  );
}
