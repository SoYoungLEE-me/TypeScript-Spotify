import axios from "axios";

export const handleAxiosError = (
  error: unknown,
  defaultMessage: string
): Error => {
  if (axios.isAxiosError(error)) {
    console.error(error.response);
    return new Error(error.response?.data?.error?.message ?? defaultMessage);
  }

  return new Error(defaultMessage);
};
