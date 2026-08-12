'use client';

// This page handles the redirect back from Google OAuth.
// The API redirects to: /auth/callback#access_token=<short-lived-token>
// We read the fragment, store it in sessionStorage, then forward the user
// to the home page (or wherever they came from).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash; // e.g. "#access_token=eyJ..."
    if (!hash) {
      setError('لم يتم العثور على رمز الدخول في الرابط');
      return;
    }

    const params = new URLSearchParams(hash.substring(1)); // strip leading '#'
    const accessToken = params.get('access_token');

    if (!accessToken) {
      setError('رمز الدخول غير صالح');
      return;
    }

    // Store token and redirect — same pattern as the login/register pages.
    sessionStorage.setItem('souq_access_token', accessToken);
    router.replace('/');
  }, [router]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="max-w-sm">
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <a href="/login" className="text-teal text-sm font-medium hover:underline">
            العودة لتسجيل الدخول
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* Simple spinner while we process the fragment */}
        <div className="w-10 h-10 rounded-full border-4 border-teal border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">جارٍ التحقق من هويتك…</p>
      </div>
    </main>
  );
}
