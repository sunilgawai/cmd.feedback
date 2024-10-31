"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { signOut } from "next-auth/react";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/billing"))
              }
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings"))
              }
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Calculator className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings"))
              }
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => signOut())}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
