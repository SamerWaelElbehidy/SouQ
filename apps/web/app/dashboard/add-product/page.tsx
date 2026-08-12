'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckIcon, AlertCircleIcon, InfoIcon, SpinnerIcon, PackageIcon } from '@/components/Icons';

const CATEGORIES = [
  { slug: 'software',  name: 'برمجيات' },
  { slug: 'design',    name: 'تصميم' },
  { slug: 'templates', name: 'قوالب' },
  { slug: 'courses',   name: 'كورسات' },
  { slug: 'games',     name: 'ألعاب' },
  { slug: 'marketing', name: 'تسويق رقمي' },
  { slug: 'music',     name: 'موسيقى وصوتيات' },
  { slug: 'security',  name: 'أمن وحماية' },
];

interface FormData {
  name: string;
  description: string;
  categorySlug: string;
  price: string;
  imageUrl: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    categorySlug: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    const token = sessionStorage.getItem('souq_access_token');
    if (!token) {
      router.replace('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.categorySlug) {
      setError('الرجاء اختيار التصنيف');
      return;
    }

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('الرجاء إدخال سعر صحيح');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('souq_access_token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name:        form.name,
          description: form.description,
          categoryId:  form.categorySlug, // Will map to real UUID after Phase 3 seeding
          price:       priceNum,
          images:      form.imageUrl ? [form.imageUrl] : [],
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = Array.isArray(body?.message)
          ? body.message.join(', ')
          : body?.message;
        throw new Error(msg || 'حدث خطأ أثناء إضافة المنتج');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  }

  if (!authorized) return null;

  if (success) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen bg-[#f7f9fc] flex items-center justify-center px-6">
          <div className="card p-10 max-w-md w-full text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #178f7a, #16324f)' }}
            >
              <CheckIcon className="text-white" size={36} />
            </div>
            <h1 className="font-black text-navy text-2xl mb-2">تم إرسال المنتج!</h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              تم إرسال منتجك للمراجعة. سيُنشر بعد موافقة الفريق.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard" className="btn btn-primary">
                لوحة التحكم
              </Link>
              <button
                onClick={() => { setSuccess(false); setForm({ name:'', description:'', categorySlug:'', price:'', imageUrl:'' }); }}
                className="btn btn-secondary"
              >
                إضافة منتج آخر
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 min-h-screen bg-[#f7f9fc]">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3" aria-label="breadcrumb">
              <Link href="/dashboard" className="hover:text-teal transition-colors">لوحة التحكم</Link>
              <span>/</span>
              <span className="text-navy font-medium">إضافة منتج جديد</span>
            </nav>
            <h1 className="text-2xl font-black text-navy">إضافة منتج جديد</h1>
            <p className="text-gray-400 text-sm mt-1">أضف منتجك الرقمي وابدأ البيع فوراً بعد المراجعة</p>
          </div>
        </div>

        <div className="container mt-8">
          <div className="max-w-2xl">
            <form
              id="add-product-form"
              onSubmit={handleSubmit}
              className="card p-8 space-y-6"
            >
              {/* Product Name */}
              <div>
                <label htmlFor="product-name" className="block text-sm font-semibold text-navy mb-2">
                  اسم المنتج <span className="text-red-400">*</span>
                </label>
                <input
                  id="product-name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="مثال: نظام إدارة مطعم كامل — React + Node.js"
                  maxLength={200}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="product-description" className="block text-sm font-semibold text-navy mb-2">
                  وصف المنتج <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  required
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="form-input resize-none"
                  placeholder="اشرح ما يتضمنه منتجك، مميزاته، وكيفية استخدامه..."
                  maxLength={3000}
                />
                <p className="text-gray-400 text-xs mt-1 text-end">
                  {form.description.length}/3000
                </p>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="product-category" className="block text-sm font-semibold text-navy mb-2">
                  التصنيف <span className="text-red-400">*</span>
                </label>
                <select
                  id="product-category"
                  name="categorySlug"
                  required
                  value={form.categorySlug}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" disabled>اختر التصنيف المناسب</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="product-price" className="block text-sm font-semibold text-navy mb-2">
                  السعر (USD) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    id="product-price"
                    name="price"
                    type="number"
                    required
                    min="1"
                    max="9999"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className="form-input ps-8"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Image URL (Phase 2 — file upload in Phase 3) */}
              <div>
                <label htmlFor="product-image" className="block text-sm font-semibold text-navy mb-2">
                  رابط صورة المنتج
                  <span className="text-gray-400 font-normal text-xs me-2">(اختياري — رفع مباشر في المرحلة القادمة)</span>
                </label>
                <input
                  id="product-image"
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/my-product-image.jpg"
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3"
                >
                  <AlertCircleIcon size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Note about review */}
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-700">
                <InfoIcon size={16} className="shrink-0 mt-0.5 text-amber-500" />
                <p>سيُراجع المنتج من قِبل الفريق قبل نشره. عادةً خلال 24 ساعة.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  id="add-product-submit"
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <SpinnerIcon size={16} className="text-white/70" />
                      جاري الإرسال...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <PackageIcon size={16} />
                      إرسال للمراجعة
                    </span>
                  )}
                </button>
                <Link
                  href="/dashboard"
                  id="add-product-cancel"
                  className="btn btn-secondary"
                >
                  إلغاء
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
