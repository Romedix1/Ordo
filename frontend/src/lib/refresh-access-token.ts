import { API_URL, ApiError } from "@/lib/auth";

let inFlight: Promise<string> | null = null;

export const refreshAccessToken = (): Promise<string> => {
  if (!inFlight) {
    inFlight = refresh().finally(() => {
      inFlight = null;
    });
  }

  return inFlight;
};

const refresh = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError("Session expired", response.status);
  }

  const data: { accessToken: string } = await response.json();

  return data.accessToken;
};
