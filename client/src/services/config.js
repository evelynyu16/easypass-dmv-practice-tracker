// In local dev we rely on Vite proxy (`/api` -> server).
// In production (e.g. Vercel) set `VITE_API_BASE_URL` to your deployed backend origin.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://easypass-dmv-practice-tracker.onrender.com";

export function apiUrl(path) {
  if (!API_BASE_URL) return path;
  return new URL(path, API_BASE_URL).toString();
}