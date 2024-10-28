'use client'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"

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
          <div
            style={{
              "--sidebar-width": "240px",
              "--sidebar-width-mobile": "240px",
            } as React.CSSProperties}
          >
            {children}
          </div>
        </SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
