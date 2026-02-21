export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

export async function apiClient<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new APIError(response.status, error.error || `Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, "Network error. Please check your connection.");
  }
}

export const api = {
  get: <T = any>(url: string) => apiClient<T>(url, { method: "GET" }),
  
  post: <T = any>(url: string, data: any) =>
    apiClient<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  put: <T = any>(url: string, data: any) =>
    apiClient<T>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  delete: <T = any>(url: string) =>
    apiClient<T>(url, { method: "DELETE" }),
};
