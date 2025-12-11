// Remove trailing slash from the base URL (important!)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

/**
 * Build correct backend URL:
 *   apiPost("/signup")  → http://localhost:4000/auth/signup
 *   apiPost("signup")   → http://localhost:4000/auth/signup
 */
const buildUrl = (path) => {
  path = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}/auth${path}`; // FORCE /auth prefix
};

/* ---------------------------------------
   GET Request
---------------------------------------- */
export const apiGet = async (path) => {
  try {
    const url = buildUrl(path);

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || `GET ${url} failed (${res.status})`);
    }

    return data;
  } catch (err) {
    console.error(`apiGet error at ${path}:`, err);
    throw err;
  }
};


/* ---------------------------------------
   POST Request
---------------------------------------- */
export const apiPost = async (path, body = {}) => {
  try {
    const url = buildUrl(path);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || `POST ${url} failed (${res.status})`);
    }

    return data;
  } catch (err) {
    console.error(`apiPost error at ${path}:`, err);
    throw err;
  }
};
