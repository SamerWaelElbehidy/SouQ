'use client';

import { Suspense, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';
import { SendIcon, CheckIcon, AlertCircleIcon } from '@/components/Icons';

// The form is in a separate component because useSearchParams() requires
// a Suspense boundary in the Next.js app-router.
function VerifyOtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') || '';

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /** Accept a single digit per box and auto-advance focus. */
  function updateDigit(index: number, value: string) {
    // Only allow one digit at a time.
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  }

  /** Handle paste — spread pasted digits across the six inputs. */
  function handlePaste(e: React.ClipboardEvent, startIndex: number) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6 - startIndex);
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      next[startIndex + i] = pasted[i];
    }
    setDigits(next);
    // Focus the box after the last pasted digit.
    const focusTarget = Math.min(startIndex + pasted.length, 5);
    inputsRef.current[focusTarget]?.focus();
  }

  /** Handle backspace — clear current box and move focus back. */
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = '';
      setDigits(next);
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await authApi.verifyRegisterOtp({
        email,
        code: digits.join(''),
      });
      sessionStorage.setItem('souq_access_token', accessToken);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      // Clear the boxes so the user can re-enter without deleting manually.
      setDigits(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setResent(false);
    try {
      await authApi.resendOtp(email);
      setResent(true);
      // Reset the "Sent!" confirmation after a few seconds.
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    }
  }

  const isFilled = digits.every((d) => d !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg shadow-navy/5 p-7 text-center"
    >
      {/* Envelope illustration */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.1 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: 'linear-gradient(135deg, #178f7a 0%, #0f6b5a 100%)' }}
      >
        <SendIcon className="text-white" size={22} />
      </motion.div>

      <h1 className="text-xl font-bold text-navy mb-1">تأكيد البريد الإلكتروني</h1>
      <p className="text-sm text-gray-500 mb-6">
        أرسلنا رمزاً من 6 أرقام إلى{' '}
        <span className="font-medium text-navy">{email}</span>
      </p>

      <form id="verify-otp-form" onSubmit={handleSubmit}>
        {/* Six digit boxes — LTR since they're numeric */}
        <div className="flex justify-center gap-2 mb-6" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              id={`otp-digit-${i}`}
              ref={(el) => { inputsRef.current[i] = el; }}
              value={d}
              onChange={(e) => updateDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={(e) => handlePaste(e, i)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`الرقم ${i + 1} من رمز التحقق`}
              className="w-11 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
            />
          ))}
        </div>

        {error && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2.5 mb-3">
            <AlertCircleIcon size={14} className="shrink-0" />
            {error}
          </p>
        )}
        {resent && (
          <p role="status" className="flex items-center justify-center gap-2 text-sm text-teal bg-teal/8 rounded-lg px-3 py-2.5 mb-3">
            <CheckIcon size={13} className="text-teal" />
            تم إرسال رمز جديد إلى بريدك
          </p>
        )}

        <motion.button
          id="verify-otp-submit"
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={loading || !isFilled}
          className="w-full bg-navy text-white rounded-xl py-3 font-medium hover-lift disabled:opacity-60"
        >
          {loading ? 'جاري التحقق...' : 'تأكيد'}
        </motion.button>
      </form>

      <button
        id="verify-otp-resend"
        type="button"
        onClick={handleResend}
        className="text-sm text-teal font-medium mt-5 hover:underline"
      >
        لم يصلك الرمز؟ إعادة الإرسال
      </button>

      <p className="text-xs text-gray-400 mt-3">
        الرمز صالح لمدة 5 دقائق
      </p>
    </motion.div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
}
