/**
 * DermaScan Centralized API Client
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function requestJson<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutMs = 30000; // 30 seconds timeout
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = typeof errorData.detail === 'string'
            ? errorData.detail
            : JSON.stringify(errorData.detail);
        }
      } catch {
        // Fallback for non-JSON errors
        if (response.status === 413) {
          errorMessage = 'The uploaded file exceeds the maximum allowed server size limit (10MB).';
        } else if (response.status === 404) {
          errorMessage = 'The requested resource was not found on the server.';
        } else if (response.status >= 500) {
          errorMessage = 'The screening service encountered an unexpected error. Please try again.';
        }
      }
      throw new ApiError(errorMessage, response.status);
    }

    return await response.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new ApiError('The request timed out. Please check your connection and try again.', 408);
    }
    if (err instanceof ApiError) {
      throw err;
    }
    // Network failures / CORS / Connection refused
    throw new ApiError(
      'Unable to connect to the DermaScan screening service. Please check that the server is running.',
      0
    );
  }
}
