'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { authApi } from '@/lib/api';
import { EyeIcon, AlertCircleIcon } from '@/components/Icons';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await authApi.login({ email, password });
      // Phase 1 keeps token handling simple (sessionStorage); a proper
      // auth-context/provider gets wired in as pages that need it are built.
      sessionStorage.setItem('souq_access_token', accessToken);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg shadow-navy/5 p-7"
    >
      <div className="flex justify-center mb-4">
        <Image src="/logo.jpg" alt="سوق" width={60} height={60} className="rounded-xl shadow-sm" priority />
      </div>
      <h1 className="text-xl font-bold text-navy mb-1 text-center">تسجيل الدخول</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">أهلاً بعودتك إلى سوق</p>

      <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="login-email" className="text-sm text-gray-600 mb-1 block">
            البريد الإلكتروني
          </label>
          <input
            id="login-email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="text-sm text-gray-600 mb-1 block">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="login-password"
              required
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-4 pl-10 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
              placeholder="••••••••"
            />
            <button
              type="button"
              id="login-toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition select-none"
            >
              <EyeIcon size={16} />
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2.5">
            <AlertCircleIcon size={14} className="shrink-0" />
            {error}
          </p>
        )}

        <motion.button
          id="login-submit"
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="mt-2 bg-navy text-white rounded-xl py-3 font-medium hover-lift disabled:opacity-60"
        >
          {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
        </motion.button>
      </form>

      {/* Google OAuth — navigates directly to the API's /auth/google which */}
      {/* initiates the Passport Google strategy redirect. */}
      <a
        id="login-google"
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
        className="mt-4 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium hover-lift"
      >
        {/* Inline Google logo — avoids adding an icon library for a single icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        المتابعة عبر جوجل
      </a>

      <p className="text-sm text-gray-500 mt-6 text-center">
        ليس لديك حساب؟{' '}
        <a href="/register" className="text-teal font-medium hover:underline">
          إنشاء حساب جديد
        </a>
      </p>
    </motion.div>
  );
}
