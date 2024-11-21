'use client'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <SidebarProvider>
          <NuqsAdapter>
            <div
              style={
                {
                  "--sidebar-width": "240px",
                  "--sidebar-width-mobile": "240px",
                } as React.CSSProperties
              }
            >
              {children}
            </div>
          </NuqsAdapter>
        </SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
