import { ForgotPasswordValues } from "@/schemas/forgot-password";
import { LoginValues } from "@/schemas/login";
import { RegisterValues } from "@/schemas/register";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5259";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(public errors: Record<string, string[]>) {
    super(Object.values(errors).flat()[0] ?? "Validation failed", 400);
    this.name = "ValidationError";
  }
}

export async function throwApiError(
  response: Response,
  fallback = "Something went wrong. Try again.",
): Promise<never> {
  const errorData = await response.json().catch(() => null);

  if (errorData?.errors) {
    throw new ValidationError(errorData.errors);
  }

  throw new ApiError(errorData?.title || fallback, response.status);
}

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
    await throwApiError(response);
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
    await throwApiError(response, "Failed to resend confirmation email.");
  }
}

export async function verifyEmail(payload: { token: string; userId: string }) {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await throwApiError(response, "Verification link is invalid or expired.");
  }
}

export async function loginUser(data: LoginValues) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
}

export async function forgotPasswordEmail(
  data: ForgotPasswordValues,
): Promise<void> {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email }),
  });

  if (!response.ok) {
    await throwApiError(response, "Failed to send reset link.");
  }
}

export async function changePassword(payload: {
  token: string;
  userId: string;
  newPassword: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await throwApiError(response, "Failed to change password.");
  }
}
