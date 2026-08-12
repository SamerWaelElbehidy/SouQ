'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, TwitterXIcon, InstagramIcon, CheckIcon, AlertCircleIcon } from '@/components/Icons';

const CONTACT_INFO = [
  { Icon: SendIcon,       label: 'تيليجرام',    value: '@SouQSupport', href: 'https://t.me/SouQSupport' },
  { Icon: TwitterXIcon,   label: 'إكس / تويتر', value: '@SouQ_sa',     href: 'https://x.com/SouQ_sa' },
  { Icon: InstagramIcon,  label: 'إنستجرام',    value: '@SouQ.sa',     href: 'https://instagram.com/SouQ.sa' },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  }

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 max-w-5xl mx-auto">

      {/* ── Form ── */}
      <div className="card p-8">
        <h2 className="font-black text-navy text-xl mb-6">أرسل رسالة</h2>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#178f7a,#16324f)' }}>
              <CheckIcon className="text-white" size={28} />
            </div>
            <h3 className="font-black text-navy text-lg mb-2">تم الإرسال!</h3>
            <p className="text-gray-400 text-sm">سنرد عليك في أقرب وقت ممكن.</p>
            <button
              onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
              className="btn btn-secondary mt-5 text-sm"
            >
              إرسال رسالة أخرى
            </button>
          </motion.div>
        ) : (
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-1.5">الاسم</label>
                <input id="contact-name" name="name" required value={form.name} onChange={handleChange}
                  className="form-input" placeholder="اسمك الكريم" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-1.5">البريد الإلكتروني</label>
                <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange}
                  className="form-input" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-semibold text-navy mb-1.5">الموضوع</label>
              <select id="contact-subject" name="subject" required value={form.subject} onChange={handleChange} className="form-input">
                <option value="" disabled>اختر الموضوع</option>
                <option>مشكلة تقنية</option>
                <option>استفسار عن منتج</option>
                <option>شكوى</option>
                <option>اقتراح</option>
                <option>الشراكة والتعاون</option>
                <option>أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-1.5">الرسالة</label>
              <textarea id="contact-message" name="message" required rows={5} value={form.message} onChange={handleChange}
                className="form-input resize-none" placeholder="اكتب رسالتك هنا..." />
            </div>
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
                <AlertCircleIcon size={14} /> حدث خطأ، حاول مجدداً.
              </p>
            )}
            <motion.button
              id="contact-submit" type="submit" disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="btn btn-primary w-full gap-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري الإرسال...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <SendIcon size={16} />
                  إرسال الرسالة
                </span>
              )}
            </motion.button>
          </form>
        )}
      </div>

      {/* ── Side info ── */}
      <div className="flex flex-col gap-5">
        <div className="card p-6">
          <h3 className="font-bold text-navy mb-5">وسائل التواصل</h3>
          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map(({ Icon, label, value, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-navy/6 text-navy flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-200">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-navy mb-3">أوقات الرد</h3>
          <div className="space-y-2">
            {[
              { day: 'الأحد — الخميس', time: '9ص — 10م' },
              { day: 'الجمعة — السبت', time: '12م — 8م'  },
            ].map(({ day, time }) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-gray-500">{day}</span>
                <span className="font-semibold text-navy">{time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-xs text-gray-500">متوسط وقت الرد: أقل من 4 ساعات</span>
          </div>
        </div>
      </div>
    </div>
  );
}
