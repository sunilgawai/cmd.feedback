import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LoyaltyForm from "@/components/forms/loyalty-form";
import React from "react";

const LoyaltyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">LoyaltyRewards</h1>
          <a
            href="#join"
            className="text-sm font-medium text-primary hover:underline"
          >
            Join Now
          </a>
        </nav>
      </header>

      <main>
        <section className="container mx-auto py-12 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Join Our Loyalty Program Today!
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Earn rewards, get exclusive offers, and enjoy special perks.
          </p>
        </section>
        <LoyaltyForm />

        <Benefits />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default LoyaltyPage;
