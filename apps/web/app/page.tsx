import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import {
  CodeIcon, PenToolIcon, LayoutIcon, GamepadIcon,
  BookOpenIcon, BarChartIcon, MusicIcon, ShieldCheckIcon,
  LockIcon, ZapIcon, ShieldIcon, CreditCardIcon,
  SearchIcon, DownloadIcon, CheckIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'سوق SouQ — منصة المنتجات الرقمية العربية',
  description: 'اشترِ وبِع المنتجات والخدمات الرقمية بأمان — أكواد، تصاميم، كورسات، قوالب.',
};

/* ── Data ────────────────────────────────────────────── */

const CATEGORIES = [
  { slug: 'software',  name: 'برمجيات',        icon: <CodeIcon size={20} />,          count: 1240, gradient: 'linear-gradient(145deg,#16324f 0%,#1e4a72 100%)' },
  { slug: 'design',    name: 'تصميم',           icon: <PenToolIcon size={20} />,        count: 875,  gradient: 'linear-gradient(145deg,#178f7a 0%,#0f6b5a 100%)' },
  { slug: 'templates', name: 'قوالب',           icon: <LayoutIcon size={20} />,         count: 643,  gradient: 'linear-gradient(145deg,#6d28d9 0%,#4c1d95 100%)' },
  { slug: 'games',     name: 'ألعاب',           icon: <GamepadIcon size={20} />,        count: 512,  gradient: 'linear-gradient(145deg,#c2410c 0%,#9a3412 100%)' },
  { slug: 'courses',   name: 'كورسات',          icon: <BookOpenIcon size={20} />,       count: 398,  gradient: 'linear-gradient(145deg,#0369a1 0%,#075985 100%)' },
  { slug: 'marketing', name: 'تسويق رقمي',     icon: <BarChartIcon size={20} />,       count: 287,  gradient: 'linear-gradient(145deg,#b45309 0%,#92400e 100%)' },
  { slug: 'music',     name: 'موسيقى',          icon: <MusicIcon size={20} />,          count: 214,  gradient: 'linear-gradient(145deg,#9d174d 0%,#831843 100%)' },
  { slug: 'security',  name: 'أمن وحماية',     icon: <ShieldCheckIcon size={20} />,    count: 176,  gradient: 'linear-gradient(145deg,#0d5e57 0%,#0a4a44 100%)' },
];

const FEATURED_PRODUCTS = [
  { id: '1', title: 'نظام إدارة متجر إلكتروني كامل — Next.js + NestJS',   price: 149, priceAfterDiscount: 89,  category: 'برمجيات', featured: true,  seller: 'dev_masters' },
  { id: '2', title: 'حزمة قوالب UI/UX احترافية لتطبيقات الجوال',           price: 79,  priceAfterDiscount: 49,  category: 'تصميم',   featured: false, seller: 'pixel_studio' },
  { id: '3', title: 'سكريبت بوت تيليجرام متعدد الوظائف — Python',           price: 59,                          category: 'برمجيات', featured: true,  seller: 'bot_forge' },
  { id: '4', title: 'كورس تعلم الذكاء الاصطناعي وتعلم الآلة من الصفر',    price: 199, priceAfterDiscount: 99,  category: 'كورسات',  featured: false, seller: 'ai_academy' },
  { id: '5', title: 'قالب موقع شركة احترافي — Figma + HTML/CSS',          price: 45,                          category: 'قوالب',   featured: false, seller: 'web_craft' },
  { id: '6', title: 'نظام نقاط البيع POS — بدون اتصال إنترنت',            price: 249, priceAfterDiscount: 179, category: 'برمجيات', featured: true,  seller: 'cashflow_apps' },
  { id: '7', title: 'مكتبة أيقونات عربية SVG — أكثر من 500 أيقونة',       price: 25,                          category: 'تصميم',   featured: false, seller: 'arab_icons' },
  { id: '8', title: 'تطبيق مواعيد للعيادات والمراكز الصحية',             price: 189, priceAfterDiscount: 139, category: 'برمجيات', featured: true,  seller: 'health_dev' },
];

const TRUST = [
  { Icon: LockIcon,        title: 'دفع آمن',         desc: 'كل معاملة محمية ومشفّرة' },
  { Icon: ZapIcon,         title: 'تسليم فوري',      desc: 'استلم منتجك فور تأكيد الدفع' },
  { Icon: ShieldIcon,      title: 'منتجات موثّقة',   desc: 'كل منتج يُراجع قبل النشر' },
  { Icon: CreditCardIcon,  title: 'دفع متعدد',       desc: 'كريبتو، بطاقات، مدى، STC Pay' },
];

const STEPS = [
  { Icon: SearchIcon,   n: '01', title: 'تصفّح وابحث',   desc: 'استكشف آلاف المنتجات عبر الفلاتر الذكية والبحث الفوري.' },
  { Icon: CreditCardIcon, n: '02', title: 'ادفع بأمان', desc: 'ادفع بالطريقة التي تناسبك مع ضمان استرداد كامل.' },
  { Icon: DownloadIcon, n: '03', title: 'استلم فوراً',   desc: 'تصلك الملفات والأكواد تلقائياً بعد ثوانٍ من الدفع.' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO (client — animated) ══════════════════════════ */}
        <HeroSection />

        {/* ══ TRUST STRIP ═══════════════════════════════════════ */}
        <section id="trust" className="bg-white border-y border-gray-100/80">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {TRUST.map(({ Icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={i * 0.07}>
                  <div className="flex flex-col items-center text-center gap-3 py-8 px-4 group cursor-default select-none">
                    <div className="w-10 h-10 rounded-xl bg-teal/8 flex items-center justify-center text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-navy text-sm">{title}</p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CATEGORIES ════════════════════════════════════════ */}
        <section id="categories" className="section bg-[#f7f9fc]">
          <div className="container">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-3">
                  التصنيفات
                </p>
                <h2 className="section-title">تصفّح حسب الفئة</h2>
                <p className="section-subtitle mt-2">اختر ما يناسب احتياجاتك من فئاتنا المتنوعة</p>
              </div>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-teal hover:text-navy transition-colors whitespace-nowrap"
              >
                عرض الكل
                <span aria-hidden className="text-lg leading-none">←</span>
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CATEGORIES.map((cat, i) => (
                <AnimatedSection key={cat.slug} delay={i * 0.055} direction="up">
                  <CategoryCard {...cat} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURED PRODUCTS ═════════════════════════════════ */}
        <section id="featured" className="section bg-white">
          <div className="container">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-3">
                  المنتجات المميزة
                </p>
                <h2 className="section-title">مختارات بعناية</h2>
                <p className="section-subtitle mt-2">أفضل المنتجات من بائعين موثوقين ومُدققة من فريقنا</p>
              </div>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-teal hover:text-navy transition-colors whitespace-nowrap"
              >
                عرض الكل
                <span aria-hidden className="text-lg leading-none">←</span>
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURED_PRODUCTS.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.065}>
                  <ProductCard {...p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
        <section
          id="how-it-works"
          className="section"
          style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)' }}
        >
          <div className="container">
            <AnimatedSection className="text-center mb-14">
              <p className="text-[11px] font-bold uppercase tracking-widest text-navy/50 mb-3">
                البداية سهلة
              </p>
              <h2 className="section-title">ثلاث خطوات فقط</h2>
              <p className="section-subtitle mt-2 max-w-md mx-auto">
                من البحث إلى الاستلام في دقائق معدودة
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
              {/* Connecting dashes — desktop only */}
              <div className="hidden md:block absolute top-[54px] start-[33%] end-[33%] h-px border-t-2 border-dashed border-navy/15 z-0" />

              {STEPS.map(({ Icon, n, title, desc }, i) => (
                <AnimatedSection key={n} delay={i * 0.12} direction="up">
                  <div className="step-card relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1 relative" style={{ background: 'linear-gradient(135deg,#16324f,#178f7a)' }}>
                      <Icon className="text-white" size={24} />
                      <span className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-white border-2 border-navy/10 flex items-center justify-center text-[10px] font-black text-navy shadow-sm">
                        {n}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy text-lg">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed text-center">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center mt-12" delay={0.4}>
              <Link
                href="/register"
                id="how-cta"
                className="btn btn-navy inline-flex items-center gap-2 text-base"
              >
                ابدأ الآن بدون رسوم
                <span aria-hidden className="text-lg">←</span>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* ══ SELLER CTA ════════════════════════════════════════ */}
        <section
          id="seller-cta"
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a1929 0%, #0f2a1f 100%)' }}
        >
          {/* Background grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="container relative z-10 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <AnimatedSection direction="right" className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">للبائعين</p>
                <h2
                  className="font-black text-white leading-tight mb-4"
                  style={{ whiteSpace: 'nowrap', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                >
                  لديك منتج رقمي؟{' '}
                  <span className="text-teal">ابدأ البيع اليوم</span>
                </h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  انضم لآلاف البائعين واكسب من منتجاتك الرقمية. إعداد في دقائق، بدون رسوم تسجيل.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {['إنشاء حساب مجاني في دقيقتين', 'رفع منتجك ومراجعة سريعة', 'استلام أرباحك مباشرة'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-teal/20 text-teal shrink-0">
                        <CheckIcon size={11} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection direction="left" className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/register"
                  id="seller-cta-btn"
                  className="btn btn-primary text-base px-8 py-4 text-center"
                >
                  ابدأ البيع مجاناً
                </Link>
                <Link
                  href="/#how-it-works"
                  className="btn text-sm text-white/60 hover:text-white text-center transition-colors"
                >
                  اعرف أكثر عن المنصة
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
