"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <SidebarMenuButton tooltip="Toggle theme">
        <div className="h-4 w-4 animate-pulse bg-muted-foreground/20" />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton
      type="button"
      onClick={toggleTheme}
      tooltip={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun /> : <Moon />}
      <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
    </SidebarMenuButton>
  );
}
