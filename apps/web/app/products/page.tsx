import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import { SearchIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'المنتجات — سوق SouQ',
  description: 'تصفّح آلاف المنتجات الرقمية: برمجيات، تصاميم، كورسات، قوالب وأكثر.',
};

/* ── Static seed data (Phase 2: real API wired in Phase 3) ── */

const ALL_CATEGORIES = [
  { slug: 'all',       label: 'الكل' },
  { slug: 'software',  label: 'برمجيات' },
  { slug: 'design',    label: 'تصميم' },
  { slug: 'templates', label: 'قوالب' },
  { slug: 'courses',   label: 'كورسات' },
  { slug: 'games',     label: 'ألعاب' },
  { slug: 'marketing', label: 'تسويق' },
  { slug: 'music',     label: 'موسيقى' },
  { slug: 'security',  label: 'أمن وحماية' },
];

const ALL_PRODUCTS = [
  { id: '1',  title: 'نظام إدارة متجر إلكتروني كامل — Next.js + NestJS', price: 149, priceAfterDiscount: 89,  category: 'برمجيات',  categorySlug: 'software',  imageEmoji: '🛒', featured: true,  seller: 'dev_masters' },
  { id: '2',  title: 'حزمة قوالب UI/UX احترافية لتطبيقات الجوال',          price: 79,  priceAfterDiscount: 49,  category: 'تصميم',    categorySlug: 'design',    imageEmoji: '📱', featured: false, seller: 'pixel_studio' },
  { id: '3',  title: 'سكريبت بوت تيليجرام متعدد الوظائف — Python',          price: 59,                          category: 'برمجيات',  categorySlug: 'software',  imageEmoji: '🤖', featured: true,  seller: 'bot_forge' },
  { id: '4',  title: 'كورس تعلم الذكاء الاصطناعي من الصفر',                price: 199, priceAfterDiscount: 99,  category: 'كورسات',   categorySlug: 'courses',   imageEmoji: '🧠', featured: false, seller: 'ai_academy' },
  { id: '5',  title: 'قالب موقع شركة احترافي — Figma + HTML',              price: 45,                          category: 'قوالب',    categorySlug: 'templates', imageEmoji: '🏢', featured: false, seller: 'web_craft' },
  { id: '6',  title: 'نظام نقاط البيع POS — يعمل بدون إنترنت',             price: 249, priceAfterDiscount: 179, category: 'برمجيات',  categorySlug: 'software',  imageEmoji: '💳', featured: true,  seller: 'cashflow_apps' },
  { id: '7',  title: 'مكتبة أيقونات عربية SVG — 500+ أيقونة',             price: 25,                          category: 'تصميم',    categorySlug: 'design',    imageEmoji: '✏️', featured: false, seller: 'arab_icons' },
  { id: '8',  title: 'تطبيق مواعيد للعيادات الطبية',                       price: 189, priceAfterDiscount: 139, category: 'برمجيات',  categorySlug: 'software',  imageEmoji: '🏥', featured: true,  seller: 'health_dev' },
  { id: '9',  title: 'قالب لوحة تحكم React Dashboard — 30 مكوّن',          price: 69,  priceAfterDiscount: 39,  category: 'قوالب',    categorySlug: 'templates', imageEmoji: '📊', featured: false, seller: 'ui_lab' },
  { id: '10', title: 'كورس تصميم الجرافيك بالعربي — Photoshop + Illustrator', price: 129, priceAfterDiscount: 79, category: 'كورسات', categorySlug: 'courses',   imageEmoji: '🎨', featured: false, seller: 'design_pro' },
  { id: '11', title: 'لعبة موبايل كاملة — Unity + C#',                     price: 299,                         category: 'ألعاب',    categorySlug: 'games',     imageEmoji: '🎮', featured: true,  seller: 'game_studio' },
  { id: '12', title: 'أداة تحليل كلمات مفتاحية SEO عربي',                 price: 49,                          category: 'تسويق',    categorySlug: 'marketing', imageEmoji: '🔍', featured: false, seller: 'seo_tools' },
  { id: '13', title: 'أصوات وموسيقى لمقاطع الفيديو — 100 مقطع',           price: 35,                          category: 'موسيقى',   categorySlug: 'music',     imageEmoji: '🎵', featured: false, seller: 'sound_ar' },
  { id: '14', title: 'سكريبت حماية ووردبريس الشاملة',                      price: 39,                          category: 'أمن',      categorySlug: 'security',  imageEmoji: '🔐', featured: false, seller: 'wp_guard' },
  { id: '15', title: 'API تحقق من صحة البيانات — Node.js',                 price: 29,                          category: 'برمجيات',  categorySlug: 'software',  imageEmoji: '🔧', featured: false, seller: 'api_store' },
  { id: '16', title: 'حزمة موشن جرافيك للسوشيال ميديا — After Effects',    price: 89,  priceAfterDiscount: 59,  category: 'تصميم',    categorySlug: 'design',    imageEmoji: '🎬', featured: false, seller: 'motion_art' },
];

/* ── Sorting options ── */
const SORT_OPTIONS = [
  { value: 'newest',    label: 'الأحدث' },
  { value: 'price_asc', label: 'السعر: الأقل أولاً' },
  { value: 'price_desc',label: 'السعر: الأعلى أولاً' },
  { value: 'popular',   label: 'الأكثر مبيعاً' },
];

interface SearchParams {
  category?: string;
  sort?: string;
  q?: string;
  page?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const activeCategory = sp.category || 'all';
  const activeSort     = sp.sort     || 'newest';
  const query          = sp.q        || '';
  const page           = parseInt(sp.page || '1', 10);
  const perPage        = 12;

  // Filter
  let products = activeCategory === 'all'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.categorySlug === activeCategory);

  if (query) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  // Sort
  if (activeSort === 'price_asc')  products = [...products].sort((a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price));
  if (activeSort === 'price_desc') products = [...products].sort((a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price));
  if (activeSort === 'popular')    products = [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  // Paginate
  const totalPages  = Math.ceil(products.length / perPage);
  const paged       = products.slice((page - 1) * perPage, page * perPage);

  function buildUrl(params: Record<string, string>) {
    const sp = new URLSearchParams({
      ...(activeCategory !== 'all' ? { category: activeCategory } : {}),
      ...(activeSort !== 'newest' ? { sort: activeSort } : {}),
      ...(query ? { q: query } : {}),
      ...params,
    });
    const s = sp.toString();
    return s ? `/products?${s}` : '/products';
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 min-h-screen bg-[#f7f9fc]">
        {/* ── Page Header ── */}
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="container">
            <h1 className="text-2xl font-black text-navy mb-1">المنتجات الرقمية</h1>
            <p className="text-gray-400 text-sm">
              {products.length.toLocaleString('ar-SA')} منتج متاح
            </p>
          </div>
        </div>

        <div className="container mt-8">
          {/* ── Search + Sort bar ── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search (client interaction — links to same page) */}
            <form
              method="GET"
              action="/products"
              className="search-bar flex-1"
              id="products-search-form"
            >
              <SearchIcon className="text-gray-400 shrink-0" size={18} aria-hidden="true" />
              <input
                id="products-search-input"
                name="q"
                defaultValue={query}
                type="search"
                placeholder="ابحث في المنتجات..."
                className="flex-1 bg-transparent outline-none text-navy"
              />
              {activeCategory !== 'all' && <input type="hidden" name="category" value={activeCategory} />}
              {activeSort !== 'newest'  && <input type="hidden" name="sort"     value={activeSort} />}
              <button type="submit" className="btn btn-primary py-2 px-4 text-sm rounded-full">
                بحث
              </button>
            </form>

            {/* Sort */}
            <SortSelect
              currentSort={activeSort}
              currentCategory={activeCategory}
              currentQuery={query}
              currentPage={page}
            />
          </div>

          {/* ── Category Pills ── */}
          <div className="flex gap-2 flex-wrap mb-8">
            {ALL_CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={buildUrl({ category: cat.slug === 'all' ? '' : cat.slug, page: '1' })}
                id={`cat-filter-${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal/40 hover:text-teal'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* ── Products Grid ── */}
          {paged.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-14 h-14 rounded-2xl bg-navy/6 text-navy/30 flex items-center justify-center mx-auto mb-5">
                <SearchIcon size={28} />
              </div>
              <h2 className="text-xl font-bold text-navy mb-2">لا توجد نتائج</h2>
              <p className="text-gray-400 text-sm">جرّب كلمة بحث أخرى أو غيّر التصنيف</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paged.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {page > 1 && (
                <a
                  href={buildUrl({ page: String(page - 1) })}
                  id="pagination-prev"
                  className="btn btn-secondary py-2 px-4 text-sm"
                >
                  ← السابق
                </a>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={buildUrl({ page: String(p) })}
                  id={`pagination-page-${p}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    p === page
                      ? 'bg-navy text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-teal/40'
                  }`}
                >
                  {p}
                </a>
              ))}
              {page < totalPages && (
                <a
                  href={buildUrl({ page: String(page + 1) })}
                  id="pagination-next"
                  className="btn btn-secondary py-2 px-4 text-sm"
                >
                  التالي →
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
