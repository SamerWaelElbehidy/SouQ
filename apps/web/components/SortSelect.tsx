'use client';

import { useRouter } from 'next/navigation';

const SORT_OPTIONS = [
  { value: 'newest',     label: 'الأحدث' },
  { value: 'price_asc',  label: 'السعر: الأقل أولاً' },
  { value: 'price_desc', label: 'السعر: الأعلى أولاً' },
  { value: 'popular',    label: 'الأكثر مبيعاً' },
];

interface Props {
  currentSort:     string;
  currentCategory: string;
  currentQuery:    string;
  currentPage:     number;
}

export default function SortSelect({ currentSort, currentCategory, currentQuery, currentPage }: Props) {
  const router = useRouter();

  function buildUrl(sort: string) {
    const sp = new URLSearchParams();
    if (currentCategory && currentCategory !== 'all') sp.set('category', currentCategory);
    if (sort !== 'newest') sp.set('sort', sort);
    if (currentQuery) sp.set('q', currentQuery);
    sp.set('page', '1');
    const s = sp.toString();
    return s ? `/products?${s}` : '/products';
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="products-sort" className="text-sm text-gray-500 whitespace-nowrap">
        ترتيب:
      </label>
      <select
        id="products-sort"
        value={currentSort}
        onChange={(e) => router.push(buildUrl(e.target.value))}
        className="form-input py-2 pe-4 ps-3 text-sm cursor-pointer"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
