const API_URL = "http://localhost:3000";

export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (token) => localStorage.setItem("token", token);
export const removeAuthToken = () => localStorage.removeItem("token");

async function request(endpoint, method = "GET", body = null) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server");
  }

  return data;
}

export const api = {
  login: (credentials) => request("/users/login", "POST", credentials),
  register: (userData) => request("/users/register", "POST", userData),
  getProfile: () => request("/profile", "GET"),
  getBuku: () => request("/buku", "GET"),
  createBuku: (bukuData) => request("/buku", "POST", bukuData),
  updateBuku: (id, bukuData) => request(`/buku/${id}`, "PUT", bukuData),
  deleteBuku: (id) => request(`/buku/${id}`, "DELETE"),
};
