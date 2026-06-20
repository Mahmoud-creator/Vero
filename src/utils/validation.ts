export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_RE.test(value.trim())) return "Enter a valid email";
  return undefined;
}

export function validatePassword(value: string, min = 6): string | undefined {
  if (!value) return "Password is required";
  if (value.length < min) return `Password must be at least ${min} characters`;
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

