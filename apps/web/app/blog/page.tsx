import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { BookOpenIcon, ArrowLeftIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'المدونة — سوق SouQ',
  description: 'آخر المقالات والنصائح حول البيع الرقمي، الأمن الإلكتروني، وأخبار منصة سوق.',
};

// Static placeholder posts — in production these come from the API
const POSTS = [
  {
    id: '1',
    slug: 'how-to-sell-digital-products',
    title: 'كيف تبدأ البيع الرقمي وتحقق دخلاً ثابتاً من الإنترنت',
    excerpt: 'دليل شامل للمبتدئين يشرح خطوات رفع أول منتج رقمي لك وكيفية تسعيره وتسويقه بشكل صحيح.',
    category: 'نصائح البيع',
    readTime: '5 دقائق',
    date: '2026-08-01',
    coverColor: 'linear-gradient(135deg,#16324f,#178f7a)',
    author: 'فريق سوق',
  },
  {
    id: '2',
    slug: 'security-tips-for-buyers',
    title: '7 نصائح أمنية يجب أن يعرفها كل مشترٍ رقمي',
    excerpt: 'كيف تحمي نفسك من الاحتيال وتتحقق من جودة المنتج قبل الشراء — دليل عملي من فريق الأمان.',
    category: 'الأمان',
    readTime: '4 دقائق',
    date: '2026-07-28',
    coverColor: 'linear-gradient(135deg,#9d174d,#831843)',
    author: 'فريق الأمان',
  },
  {
    id: '3',
    slug: 'binance-pay-guide',
    title: 'كيف تدفع بـ Binance Pay على سوق — شرح مبسّط للمبتدئين',
    excerpt: 'شرح خطوة بخطوة لطريقة إنشاء محفظة Binance وإتمام أول عملية شراء على منصتنا.',
    category: 'المدفوعات',
    readTime: '6 دقائق',
    date: '2026-07-22',
    coverColor: 'linear-gradient(135deg,#b45309,#92400e)',
    author: 'فريق سوق',
  },
  {
    id: '4',
    slug: 'souq-platform-launch',
    title: 'إطلاق منصة سوق — الرؤية والأهداف والخارطة',
    excerpt: 'نعلن اليوم عن إطلاق منصة سوق لنكون الوجهة الأولى للمنتجات الرقمية في العالم العربي.',
    category: 'أخبار المنصة',
    readTime: '3 دقائق',
    date: '2026-07-15',
    coverColor: 'linear-gradient(135deg,#0369a1,#075985)',
    author: 'فريق سوق',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}>
          <AnimatedSection className="max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">المدونة</p>
            <h1 className="text-4xl font-black text-white mb-4">مقالات وأفكار</h1>
            <p className="text-white/55">نصائح، أخبار، وأدلة من فريق سوق</p>
          </AnimatedSection>
        </section>

        <section className="section bg-[#f7f9fc]">
          <div className="container max-w-5xl">

            {/* Featured post */}
            <AnimatedSection className="mb-10">
              <Link href={`/blog/${featured.slug}`} id={`blog-${featured.id}`}
                className="card block overflow-hidden group hover:border-teal/30 transition-colors">
                <div className="grid md:grid-cols-[1.4fr_1fr]">
                  <div className="aspect-video md:aspect-auto flex items-center justify-center p-12"
                    style={{ background: featured.coverColor }}>
                    <BookOpenIcon className="text-white/60" size={64} />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-bold">{featured.category}</span>
                      <span className="text-xs text-gray-400">{featured.readTime} قراءة</span>
                    </div>
                    <h2 className="font-black text-navy text-xl leading-snug mb-3 group-hover:text-teal transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{formatDate(featured.date)} · {featured.author}</span>
                      <span className="flex items-center gap-1 text-teal text-sm font-bold group-hover:gap-2 transition-all">
                        اقرأ المزيد <ArrowLeftIcon size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* Post grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} id={`blog-${post.id}`}
                    className="card block overflow-hidden group hover:border-teal/30 transition-colors h-full flex flex-col">
                    <div className="aspect-[2/1] flex items-center justify-center" style={{ background: post.coverColor }}>
                      <BookOpenIcon className="text-white/50" size={36} />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-navy/6 text-navy text-[10px] font-bold">{post.category}</span>
                        <span className="text-[10px] text-gray-400">{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-teal transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <span className="text-[10px] text-gray-400">{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1 text-teal text-xs font-bold">
                          اقرأ <ArrowLeftIcon size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
