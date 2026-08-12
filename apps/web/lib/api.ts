// Minimal fetch wrapper for talking to the NestJS API.
// Centralizing this now means all pages share the same auth headers,
// error handling, credentials, and base URL.

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiError {
  statusCode: number;
  message: string | string[];
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('souq_access_token');
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include', // sends/receives the httpOnly refresh-token cookie
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiError | null;
    const message = Array.isArray(body?.message)
      ? body?.message.join(', ')
      : body?.message;
    throw new Error(message || 'حدث خطأ غير متوقع');
  }

  return res.json();
}

/* ── Auth ───────────────────────────────────────────────────── */
export const authApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  verifyRegisterOtp: (data: { email: string; code: string }) =>
    apiFetch<{ accessToken: string }>('/auth/register/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resendOtp: (email: string) =>
    apiFetch('/auth/register/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  login: (data: { email: string; password: string }) =>
    apiFetch<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refresh: () =>
    apiFetch<{ accessToken: string }>('/auth/refresh', { method: 'POST' }),

  logout: () =>
    apiFetch('/auth/logout', { method: 'POST' }),

  me: () =>
    apiFetch<{ userId: string; email: string }>('/auth/me'),

  googleLoginUrl: () => `${API_URL}/auth/google`,
};

/* ── Categories ─────────────────────────────────────────────── */
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export const categoriesApi = {
  list: () => apiFetch<Category[]>('/categories'),
};

/* ── Products ───────────────────────────────────────────────── */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  priceAfterDiscount?: string;
  images: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLOCKED';
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  images?: string[];
}

export const productsApi = {
  list: (params?: {
    category?: string;
    q?: string;
    sort?: string;
    page?: number;
    perPage?: number;
  }) => {
    const sp = new URLSearchParams();
    if (params?.category) sp.set('category', params.category);
    if (params?.q)        sp.set('q',        params.q);
    if (params?.sort)     sp.set('sort',     params.sort);
    if (params?.page)     sp.set('page',     String(params.page));
    if (params?.perPage)  sp.set('perPage',  String(params.perPage));
    const qs = sp.toString();
    return apiFetch<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`);
  },

  get: (id: string) => apiFetch<Product>(`/products/${id}`),

  create: (dto: CreateProductDto) =>
    apiFetch<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),

  update: (id: string, dto: Partial<CreateProductDto>) =>
    apiFetch<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    }),

  delete: (id: string) =>
    apiFetch(`/products/${id}`, { method: 'DELETE' }),
};
