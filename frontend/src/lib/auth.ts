import { RegisterValues } from "@/schemas/register";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5259";

export class RegisterValidationError extends Error {
  constructor(public errors: Record<string, string[]>) {
    super("Validation failed");
  }
}

export class ResendEmailError extends Error {}

export interface RegisterResponse {
  id: string;
  email: string;
}

export async function registerUser(
  data: RegisterValues,
): Promise<RegisterResponse> {
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

export async function resendConfirmationEmail(payload: {
  userId?: string;
  email?: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/auth/resend-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const firstError = errorData?.errors
      ? Object.values(errorData.errors).flat()[0]
      : null;
    const errorMessage =
      firstError || errorData?.title || "Failed to resend confirmation email.";

    throw new ResendEmailError(errorMessage as string);
  }
}
