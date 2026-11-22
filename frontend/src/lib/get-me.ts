import { API_URL, throwApiError } from "@/lib/auth";

export type Me = {
  id: string;
  name: string;
  email: string;
  avatarColor: number;
};

export const getMe = async (accessToken: string): Promise<Me> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    await throwApiError(response, "Failed to load user.");
  }

  return response.json();
};
