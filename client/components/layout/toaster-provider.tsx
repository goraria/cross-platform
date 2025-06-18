"use client";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToasterProvider() {
  const { theme, resolvedTheme } = useTheme();
  // Sonner chỉ nhận 'light' hoặc 'dark', không nhận 'system'
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  return <Toaster theme={currentTheme as "light" | "dark"} />;
}
