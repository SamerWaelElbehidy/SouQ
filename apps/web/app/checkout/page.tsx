'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/useCartStore';
import { CheckIcon, CreditCardIcon, ShieldCheckIcon, AlertCircleIcon } from '@/components/Icons';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal; // Phase 1: No taxes or fees calculated here

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for payment
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      
      // Redirect to home after 4 seconds
      setTimeout(() => {
        router.push('/');
      }, 4000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isMounted) return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-[#f7f9fc]">
        <div className="container max-w-6xl">
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              // ── Success State ──
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto mt-20 bg-white p-10 rounded-3xl shadow-xl shadow-teal/5 text-center border border-gray-100"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckIcon size={40} className="text-green-500" />
                </div>
                <h1 className="text-2xl font-black text-navy mb-2">تم الطلب بنجاح!</h1>
                <p className="text-gray-500 mb-8">
                  شكراً لك {formData.name}. تم تأكيد طلبك وسنرسل لك التفاصيل والمنتجات عبر البريد الإلكتروني.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-4 h-4 rounded-full border-2 border-t-teal animate-spin" />
                  جاري تحويلك للصفحة الرئيسية...
                </div>
              </motion.div>
            ) : items.length === 0 ? (
              // ── Empty Cart State ──
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <AlertCircleIcon size={40} />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-3">السلة فارغة</h2>
                <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات لتتمكن من إتمام الطلب.</p>
                <Link
                  href="/products"
                  className="inline-block px-8 py-3.5 rounded-xl bg-teal text-white font-bold hover:bg-[#0f6b5a] transition-all"
                >
                  تصفّح المنتجات
                </Link>
              </motion.div>
            ) : (
              // ── Checkout Form ──
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Right Column: Payment Form */}
                <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-navy mb-6 pb-4 border-b border-gray-100">
                      معلومات الدفع
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1.5 block">الاسم الكامل</label>
                          <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="محمد العتيبي"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block">البريد الإلكتروني</label>
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
                          />
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="pt-4 mt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCardIcon size={20} className="text-teal" />
                          <h3 className="font-bold text-navy">البطاقة البنكية</h3>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div>
                            <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 mb-1.5 block">رقم البطاقة</label>
                            <input
                              required
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              maxLength={19}
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="0000 0000 0000 0000"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition text-left font-mono"
                              dir="ltr"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="text-sm font-medium text-gray-700 mb-1.5 block">تاريخ الانتهاء</label>
                              <input
                                required
                                type="text"
                                id="expiry"
                                name="expiry"
                                maxLength={5}
                                value={formData.expiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition text-left font-mono"
                                dir="ltr"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-1.5 block">رمز الأمان (CVV)</label>
                              <input
                                required
                                type="text"
                                id="cvv"
                                name="cvv"
                                maxLength={3}
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition text-left font-mono"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <ShieldCheckIcon size={18} className="text-green-500 shrink-0" />
                        <span>جميع معلومات الدفع مشفرة ومحمية بالكامل. (هذا نموذج تجريبي فقط)</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 bg-teal text-white rounded-xl py-4 font-bold text-lg hover:bg-[#0f6b5a] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin shrink-0" />
                            جاري الدفع...
                          </>
                        ) : (
                          `ادفع ${total.toFixed(2)}$`
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Left Column: Order Summary */}
                <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-28">
                    <h2 className="text-xl font-bold text-navy mb-6">ملخص الطلب</h2>
                    
                    <ul className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-1">
                      {items.map((item) => (
                        <li key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gray-50 shrink-0 border border-gray-100 relative overflow-hidden">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-navy/20" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-navy line-clamp-2 leading-snug">{item.title}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500">الكمية: {item.quantity}</span>
                              <span className="text-teal font-bold text-sm">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>المجموع الفرعي</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>الضرائب</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-100">
                        <span className="font-bold text-navy text-base">الإجمالي</span>
                        <span className="font-black text-xl text-teal">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  );
}
