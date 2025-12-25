import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openEmailClient(obfuscatedEmail: string) {
  const email = obfuscatedEmail.replace("[at]", "@").replace("[dot]", ".");
  window.location.href = `mailto:${email}`;
}
