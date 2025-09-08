import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPascalCase<T extends object>(
  obj: T
): Record<string, unknown> {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return {};
  }
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      acc[pascalKey] = value;
      return acc;
    },
    {} as Record<string, unknown>
  );
}
