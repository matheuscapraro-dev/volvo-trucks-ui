"use client";

import { toast } from "sonner";

interface ApiValidationError {
  propertyName: string;
  errorMessage: string;
}

interface ApiError {
  title?: string;
  status?: number;
  detail?: string;
  errors?: ApiValidationError[];
}

/**
 * Handle API errors in a uniform way.
 * @param error The thrown error (usually from fetch/axios)
 * @param fallbackMessage Message to show if the error cannot be parsed
 */
export function handleApiError(
  error: unknown,
  fallbackMessage = "An error occurred"
) {
  if (error && typeof error === "object") {
    const data =
      (error as { response?: { data?: ApiError }; data?: ApiError })?.response
        ?.data ??
      (error as { data?: ApiError }).data ??
      (error as ApiError);

    if (data) {
      if (data.title && data.detail) {
        toast.error(`${data.title}: ${data.detail}`);
        return;
      }

      if (data.title && Array.isArray(data.errors)) {
        data.errors.forEach((e) => {
          toast.error(`${e.propertyName}: ${e.errorMessage}`);
        });
        return;
      }
    }
  }

  toast.error(fallbackMessage);
}
