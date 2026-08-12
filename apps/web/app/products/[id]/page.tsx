import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import {
  ShoppingCartIcon, HeartIcon, LockIcon, ZapIcon,
  ShieldIcon, StarIcon, CheckIcon, TagIcon, PackageIcon,
} from '@/components/Icons';

const ALL_PRODUCTS = [
  { id: '1',  title: 'نظام إدارة متجر إلكتروني كامل — Next.js + NestJS', price: 149, priceAfterDiscount: 89,  category: 'برمجيات',  categorySlug: 'software', featured: true,  seller: 'dev_masters',
    description: 'نظام متجر إلكتروني متكامل مبني بأحدث التقنيات. يشمل: لوحة تحكم للبائع، إدارة المنتجات والطلبات، نظام دفع متعدد، تقارير مبيعات، API كامل، وتصميم متجاوب.',
    features: ['لوحة تحكم متكاملة', 'دعم الدفع الإلكتروني', 'تصميم متجاوب', 'كود مفتوح المصدر', 'دعم 6 أشهر'],
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'TailwindCSS'] },
  { id: '2',  title: 'حزمة قوالب UI/UX احترافية لتطبيقات الجوال', price: 79, priceAfterDiscount: 49, category: 'تصميم', categorySlug: 'design', featured: false, seller: 'pixel_studio',
    description: 'حزمة شاملة من قوالب التصميم لتطبيقات الجوال. تشمل أكثر من 200 شاشة جاهزة، أنظمة ألوان متعددة، ومكونات قابلة للتخصيص.',
    features: ['200+ شاشة جاهزة', 'Figma + XD', 'أنظمة ألوان متعددة', 'تحديثات مستمرة'],
    tags: ['Figma', 'UI Kit', 'Mobile', 'Design System'] },
  { id: '3',  title: 'سكريبت بوت تيليجرام متعدد الوظائف — Python', price: 59, category: 'برمجيات', categorySlug: 'software', featured: true, seller: 'bot_forge',
    description: 'بوت تيليجرام احترافي يدعم الردود التلقائية، إدارة المجموعات، دعم الدفع، لوحة تحكم ويب، وأوامر مخصصة.',
    features: ['ردود تلقائية ذكية', 'إدارة مجموعات', 'لوحة تحكم ويب', 'دعم دفع إلكتروني'],
    tags: ['Python', 'Telegram', 'Bot', 'Aiogram'] },
  { id: '4',  title: 'كورس تعلم الذكاء الاصطناعي من الصفر', price: 199, priceAfterDiscount: 99, category: 'كورسات', categorySlug: 'courses', featured: false, seller: 'ai_academy',
    description: 'كورس شامل باللغة العربية في الذكاء الاصطناعي وتعلم الآلة. يشمل Python، NumPy، Pandas، TensorFlow، ومشاريع تطبيقية.',
    features: ['40+ ساعة محتوى', 'باللغة العربية', 'مشاريع تطبيقية', 'شهادة إتمام', 'دعم مدى الحياة'],
    tags: ['Python', 'AI', 'Machine Learning', 'TensorFlow'] },
  { id: '5',  title: 'قالب موقع شركة احترافي — Figma + HTML', price: 45, category: 'قوالب', categorySlug: 'templates', featured: false, seller: 'web_craft',
    description: 'قالب موقع شركة احترافي يشمل 5 صفحات: رئيسية، عن الشركة، الخدمات، المشاريع، تواصل.',
    features: ['5 صفحات كاملة', 'تصميم متجاوب', 'HTML + CSS نظيف', 'ملف Figma'],
    tags: ['HTML', 'CSS', 'Figma', 'Landing Page'] },
  { id: '6',  title: 'نظام نقاط البيع POS — يعمل بدون إنترنت', price: 249, priceAfterDiscount: 179, category: 'برمجيات', categorySlug: 'software', featured: true, seller: 'cashflow_apps',
    description: 'نظام POS للمتاجر والمطاعم يعمل بدون إنترنت. إدارة مخزون، تقارير مبيعات، باركود، طباعة فواتير، إدارة موظفين.',
    features: ['يعمل أوفلاين', 'إدارة مخزون', 'تقارير مفصلة', 'دعم الباركود', 'طباعة فواتير'],
    tags: ['Electron', 'SQLite', 'POS', 'React'] },
  { id: '7',  title: 'مكتبة أيقونات عربية SVG — أكثر من 500 أيقونة', price: 25, category: 'تصميم', categorySlug: 'design', featured: false, seller: 'arab_icons',
    description: 'مكتبة SVG مصممة للواجهات العربية. أكثر من 500 أيقونة في فئات متعددة، قابلة للتخصيص بالكامل.',
    features: ['500+ أيقونة', 'صيغة SVG', 'قابلة للتعديل', 'فئات متعددة', 'استخدام تجاري'],
    tags: ['SVG', 'Icons', 'UI', 'Arabic'] },
  { id: '8',  title: 'تطبيق مواعيد للعيادات الطبية', price: 189, priceAfterDiscount: 139, category: 'برمجيات', categorySlug: 'software', featured: true, seller: 'health_dev',
    description: 'نظام إدارة مواعيد للعيادات. حجز أونلاين، تذكيرات SMS، إدارة الأطباء والمرضى، تقارير، دفع إلكتروني.',
    features: ['حجز أونلاين', 'تذكيرات SMS', 'إدارة أطباء', 'تقارير تفصيلية', 'دفع إلكتروني'],
    tags: ['React', 'Node.js', 'Clinic', 'Healthcare'] },
];

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = ALL_PRODUCTS.find((p) => p.id === params.id);
  if (!product) return { title: 'المنتج غير موجود' };
  return { title: `${product.title} — سوق SouQ`, description: product.description.slice(0, 160) };
}

export default function ProductDetailPage({ params }: Props) {
  const product = ALL_PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = ALL_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const displayPrice = product.priceAfterDiscount ?? product.price;
  const hasDiscount  = product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price;
  const discountPct  = hasDiscount ? Math.round(((product.price - displayPrice) / product.price) * 100) : 0;

  const TRUST_POINTS = [
    { Icon: LockIcon,   text: 'دفع آمن ومشفّر' },
    { Icon: ZapIcon,    text: 'تسليم فوري بعد الدفع' },
    { Icon: ShieldIcon, text: 'ضمان استرداد 7 أيام' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen bg-[#f7f9fc]">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="breadcrumb">
              <Link href="/" className="hover:text-teal transition-colors">الرئيسية</Link>
              <span className="text-gray-200">/</span>
              <Link href="/products" className="hover:text-teal transition-colors">المنتجات</Link>
              <span className="text-gray-200">/</span>
              <span className="text-navy font-medium truncate max-w-xs">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Image + Description */}
            <AnimatedSection className="lg:col-span-2 space-y-5" direction="right">

              {/* Product visual */}
              <div className="card p-0 overflow-hidden">
                <div className="relative flex items-center justify-center aspect-video bg-gradient-to-br from-[#f0f4f8] to-[#e8eef5]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-32 rounded-3xl opacity-10"
                      style={{ background: 'linear-gradient(135deg, #16324f, #178f7a)' }}
                    />
                  </div>
                  <PackageIcon className="relative text-navy/30" size={64} />

                  {product.featured && (
                    <div className="absolute top-4 start-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold">
                        <TagIcon size={11} />
                        منتج مميز
                      </span>
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="absolute top-4 end-4">
                      <span className="px-3 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-bold">
                        خصم {discountPct}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description card */}
              <div className="card p-7">
                <h2 className="font-bold text-navy text-base mb-4 pb-4 border-b border-gray-100">وصف المنتج</h2>
                <p className="text-gray-600 leading-[1.9] text-sm">{product.description}</p>

                {product.features && (
                  <div className="mt-6">
                    <h3 className="font-bold text-navy text-sm mb-4">ما يشمله المنتج</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                            <CheckIcon size={11} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-navy/6 text-navy text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Right: Purchase card */}
            <AnimatedSection direction="left">
              <div className="card p-6 sticky top-24">
                <h1 className="font-black text-navy text-base leading-snug mb-4">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <StarIcon key={i} size={13} className={i <= 4 ? 'text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">4.8 · 127 تقييم</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-navy">${displayPrice.toFixed(2)}</span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-teal text-sm font-semibold mt-1">
                      وفّرت ${(product.price - displayPrice).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Buy button */}
                <Link
                  href="/register"
                  id="product-buy-btn"
                  className="btn btn-primary w-full mb-2.5 text-[15px] justify-center gap-2"
                >
                  <ShoppingCartIcon size={17} />
                  اشترِ الآن
                </Link>
                <button
                  id="product-wishlist-btn"
                  className="btn btn-secondary w-full text-sm justify-center gap-2"
                >
                  <HeartIcon size={15} />
                  أضف للمفضلة
                </button>

                {/* Seller */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">البائع</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {product.seller.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-navy text-sm">{product.seller}</p>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <ShieldIcon size={10} />
                        بائع موثّق
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust points */}
                <div className="mt-5 flex flex-col gap-2.5">
                  {TRUST_POINTS.map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs text-gray-400">
                      <Icon size={14} className="text-teal shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <AnimatedSection>
                <h2 className="section-title mb-6">منتجات مشابهة</h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p, i) => (
                  <AnimatedSection key={p.id} delay={i * 0.07}>
                    <ProductCard {...p} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
