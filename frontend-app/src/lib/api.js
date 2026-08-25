import axios from "axios";


const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

const backendUrl =
  process.env.NEXT_PUBLIC_NORMAL_API_URL?.replace(/\/$/, '')

if (!apiUrl) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is missing from .env.local'
  )
}

if (!backendUrl) {
  throw new Error(
    'NEXT_PUBLIC_NORMAL_API_URL is missing from .env.local'
  )
}

export async function getCsrfCookie() {
  return axios.get(
    `${backendUrl}/sanctum/csrf-cookie`,
    {
      withCredentials: true,
    }
  )
}

export const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

apiClient.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();

    if (config.data instanceof FormData) {
        if (config.headers?.set) {
            config.headers.set('Content-Type', undefined);
        } else {
            delete config.headers?.['Content-Type'];
            delete config.headers?.['content-type'];
        }
    }

    // نتحقق من نوع الطلب
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
        try {
            const rootUrl = process.env.NEXT_PUBLIC_NORMAL_API_URL?.replace(/\/$/, '');

            if (!rootUrl) {
                throw new Error(
                    'NEXT_PUBLIC_NORMAL_API_URL is missing or undefined'
                );
            }

            const response = await axios.get(`${rootUrl}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });

            console.log('[Interceptor] CSRF cookie fetched', response.status);
        } catch (error) {
            console.error("%c[Interceptor] %cفشل جلب CSRF Cookie:", "color: blue; font-weight: bold", "color: red", error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

let isRedirecting = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? "";

    if (isRedirecting || typeof window === "undefined") {
      return Promise.reject(error);
    }

    const currentPath = window.location.pathname;

    // Don't redirect if already on login or unauthorized page
    const isSafePage =
      currentPath.includes("/wp-admin/login") ||
      currentPath.includes("/unauthorized");

    if (isSafePage) {
      return Promise.reject(error); // ← stop here, no redirect
    }

    const isExpired =
      status === 401 &&
      (message === "Unauthenticated." ||
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("unauthenticated"));

    const isForbidden = status === 403;

    if (isExpired) {
      isRedirecting = true;
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/wp-admin/login?reason=expired";
    } else if (isForbidden) {
      isRedirecting = true;
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  }
);