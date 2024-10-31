export const siteConfig = {
  name: "NextLaunch",
  description: "Your SaaS Description",
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: "https://your-og-image.png",
  links: {
    twitter: "https://twitter.com/fiston_user",
    github: "https://github.com/fiston-user/nextlaunch",
  },
  emails: {
    from: {
      name: "NextLaunch",
      email: "notifications@onboarding.dev", // Must be verified in Resend
    },
  },
  stripe: {
    plans: [
      {
        name: "Starter",
        description: "Good for small projects",
        price: {
          amount: 9,
          priceIds: {
            test: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER,
            production: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER,
          },
        },
        features: ["Feature 1", "Feature 2", "Feature 3"],
      },
      {
        name: "Pro",
        description: "Perfect for growing businesses",
        price: {
          amount: 29,
          priceIds: {
            test: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
            production: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
          },
        },
        features: ["All Starter features", "Feature 4", "Feature 5"],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
