import { toPascalCase } from "@/lib/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiError {
  title?: string;
  status?: number;
  detail?: string;
  errors?: { propertyName: string; errorMessage: string }[];
}

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json().catch(() => ({
      detail: response.statusText,
      status: response.status,
    }));

    throw errorBody;
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return fetcher<T>(path);
  },

  post<T>(path: string, body: object): Promise<T> {
    return fetcher<T>(path, {
      method: "POST",
      body: JSON.stringify(toPascalCase(body)),
    });
  },

  put<T>(path: string, body: object): Promise<T> {
    return fetcher<T>(path, {
      method: "PUT",
      body: JSON.stringify(toPascalCase(body)),
    });
  },

  del<T>(path: string): Promise<T> {
    return fetcher<T>(path, {
      method: "DELETE",
    });
  },
};
