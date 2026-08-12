'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { ChevronDownIcon, SearchIcon } from '@/components/Icons';

const FAQS = [
  {
    category: 'الحساب',
    items: [
      { q: 'كيف أنشئ حساباً على سوق؟', a: 'اضغط على زر "إنشاء حساب" في الأعلى، ادخل بياناتك، ثم أدخل رمز OTP الذي سيُرسل لبريدك الإلكتروني. العملية لا تستغرق أكثر من دقيقتين.' },
      { q: 'هل يمكنني التسجيل بحساب جوجل؟', a: 'نعم، يمكنك الدخول بحساب Google بضغطة واحدة. لن تحتاج لإنشاء كلمة مرور جديدة.' },
      { q: 'ماذا أفعل إن نسيت كلمة المرور؟', a: 'اضغط على "نسيت كلمة المرور" في صفحة الدخول، ستصلك رسالة لإعادة تعيين كلمة مرور جديدة.' },
      { q: 'هل يمكنني امتلاك أكثر من حساب؟', a: 'لا، كل شخص يحق له حساب واحد فقط. إنشاء حسابات متعددة يُعدّ مخالفة ويؤدي لحظر دائم.' },
    ],
  },
  {
    category: 'الشراء',
    items: [
      { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل حالياً الدفع عبر Binance Pay (عملات رقمية — USDT، BNB، BTC وغيرها). نعمل على إضافة مدى وبطاقات الائتمان قريباً.' },
      { q: 'متى أستلم منتجي بعد الدفع؟', a: 'التسليم فوري تلقائياً — بمجرد تأكيد الدفع ستظهر لك محتويات المنتج مباشرة في صفحتك.' },
      { q: 'هل يوجد ضمان استرداد؟', a: 'نعم، يوجد ضمان استرداد كامل خلال 7 أيام من الشراء في حال كان المنتج لا يعمل كما هو موضّح.' },
      { q: 'هل يمكنني الشراء بدون حساب؟', a: 'لا، يجب أن يكون لديك حساب مفعّل للشراء. هذا يضمن حماية حقوقك وتتبع مشترياتك.' },
    ],
  },
  {
    category: 'البيع',
    items: [
      { q: 'كيف أبدأ البيع على سوق؟', a: 'بعد إنشاء الحساب، اذهب للوحة التحكم واضغط "إضافة منتج". أدخل بيانات المنتج وسيُراجع خلال 24 ساعة.' },
      { q: 'ما نسبة العمولة التي يأخذها سوق؟', a: 'في المرحلة الحالية، نحن في وضع بناء سمعة وثقة — العمولة صفر. ستُعلَن النسب عند التحول للمرحلة التجارية.' },
      { q: 'كم من الوقت تستغرق مراجعة المنتج؟', a: 'عادةً خلال 24 ساعة. في أوقات الذروة قد تمتد إلى 48 ساعة. ستصلك إشعار بالقبول أو الرفض.' },
      { q: 'هل يمكنني بيع أي نوع من المنتجات؟', a: 'فقط المنتجات الرقمية القانونية: أكواد، تصاميم، كورسات، قوالب، بوتات. المنتجات المخالفة للأنظمة ترفض فوراً.' },
    ],
  },
  {
    category: 'الأمان',
    items: [
      { q: 'كيف تحمون بياناتي الشخصية؟', a: 'جميع البيانات مشفّرة بـ AES-256. كلمات المرور مُشفّرة بـ Argon2 (لا يمكن قراءتها حتى من فريقنا). نتبع أعلى معايير حماية البيانات.' },
      { q: 'ما الذي تفعلونه لمنع الاحتيال؟', a: 'نراجع كل منتج يدوياً، نتحقق من هوية البائعين، ونستخدم أنظمة ذكية لاكتشاف السلوك المشبوه.' },
      { q: 'هل موقعكم آمن من الاختراق؟', a: 'نستخدم أحدث تقنيات الحماية: Helmet, Rate Limiting, CSRF, WAF عبر Cloudflare. نجري فحوصات أمنية دورية.' },
    ],
  },
];

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      !search || item.q.includes(search) || item.a.includes(search)
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}>
          <AnimatedSection className="max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">الأسئلة الشائعة</p>
            <h1 className="text-4xl font-black text-white mb-6">كل ما تحتاج معرفته</h1>
            <div className="flex items-center gap-3 max-w-md mx-auto p-2 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl">
              <SearchIcon className="text-white/30 ms-2 shrink-0" size={18} />
              <input
                type="search"
                placeholder="ابحث عن سؤالك..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/30 text-sm"
                id="faq-search"
              />
            </div>
          </AnimatedSection>
        </section>

        {/* FAQ Accordion */}
        <section className="section bg-[#f7f9fc]">
          <div className="container max-w-3xl">
            {filtered.length === 0 ? (
              <AnimatedSection className="text-center py-16">
                <p className="text-gray-400">لا توجد نتائج لـ "{search}"</p>
              </AnimatedSection>
            ) : (
              filtered.map((cat, ci) => (
                <AnimatedSection key={cat.category} delay={ci * 0.08} className="mb-8">
                  <h2 className="text-sm font-black uppercase tracking-widest text-navy/40 mb-4">{cat.category}</h2>
                  <div className="flex flex-col gap-2">
                    {cat.items.map((item, ii) => {
                      const key = `${ci}-${ii}`;
                      const isOpen = openKey === key;
                      return (
                        <div key={key} className={`card overflow-hidden transition-all duration-300 ${isOpen ? 'border-teal/30' : ''}`}>
                          <button
                            id={`faq-${key}`}
                            onClick={() => setOpenKey(isOpen ? null : key)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-right"
                            aria-expanded={isOpen}
                          >
                            <span className="font-bold text-navy text-sm leading-snug">{item.q}</span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="shrink-0 text-teal"
                            >
                              <ChevronDownIcon size={18} />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="px-5 pb-5 text-gray-500 text-sm leading-[1.9]">{item.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </AnimatedSection>
              ))
            )}

            <AnimatedSection className="mt-10 card p-7 text-center bg-gradient-to-br from-teal/5 to-navy/5 border-teal/20">
              <h3 className="font-bold text-navy mb-2">لم تجد إجابتك؟</h3>
              <p className="text-gray-400 text-sm mb-5">فريقنا جاهز للرد على أي سؤال</p>
              <a href="/contact" className="btn btn-primary inline-flex">تواصل مع الدعم</a>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
