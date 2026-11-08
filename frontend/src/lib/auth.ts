import { RegisterValues } from "@/schemas/register";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5259";

export class RegisterValidationError extends Error {
  constructor(public errors: Record<string, string[]>) {
    super("Validation failed");
  }
}

export interface RegisterResponse {
  id: string;
  email: string;
}

export async function registerUser(data: RegisterValues): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData?.errors) {
      throw new RegisterValidationError(errorData.errors);
    }

    throw new Error(errorData?.title || "Something went wrong. Try again.");
  }

  return response.json();
}
