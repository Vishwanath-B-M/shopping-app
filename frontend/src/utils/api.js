export const API_URL =
  import.meta.env.VITE_API_URL || "https://shopping-app-4-3bid.onrender.com";

export function getToken() {
  const token = localStorage.getItem("token");
  // old versions stored the text "logged-in", which is not a real token
  return token && token !== "logged-in" ? token : null;
}

// Use this instead of fetch() for every backend call.
// It sends the JWT as a Bearer token, so login works in Safari too.
export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
}