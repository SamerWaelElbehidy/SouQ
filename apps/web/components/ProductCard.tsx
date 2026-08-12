'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon, TagIcon } from '@/components/Icons';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  category: string;
  badge?: string;
  seller?: string;
  featured?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  priceAfterDiscount,
  category,
  seller,
  featured = false,
}: ProductCardProps) {
  const displayPrice = priceAfterDiscount ?? price;
  const hasDiscount  = priceAfterDiscount !== undefined && priceAfterDiscount < price;
  const discountPct  = hasDiscount
    ? Math.round(((price - displayPrice) / price) * 100)
    : 0;

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      title,
      price: displayPrice,
    });
  };

  return (
    <motion.div
      className="product-card relative group"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <Link href={`/products/${id}`} id={`product-card-${id}`} className="block">

        {/* Image area — clean gradient placeholder */}
        <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Abstract product visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #16324f, #178f7a)' }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingCartIcon className="text-gray-400 group-hover:text-teal transition-colors duration-300" size={28} />
          </div>

          {/* Badges */}
          {featured && (
            <div className="absolute top-3 start-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[11px] font-bold">
                <TagIcon size={10} />
                مميز
              </span>
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-3 end-3">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-[11px] font-bold">
                -{discountPct}%
              </span>
            </div>
          )}

          {/* Wishlist button — appears on hover */}
          <motion.button
            aria-label="أضف للمفضلة"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 duration-200"
            style={{ display: hasDiscount ? 'none' : undefined }}
          >
            <HeartIcon size={14} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[11px] font-semibold text-teal uppercase tracking-widest mb-1.5">
            {category}
          </p>
          <h3 className="text-[13.5px] font-bold text-navy leading-snug line-clamp-2 group-hover:text-teal transition-colors duration-200 mb-2">
            {title}
          </h3>

          {seller && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center">
                <span className="text-white text-[8px] font-black">{seller.charAt(0).toUpperCase()}</span>
              </div>
              <p className="text-[11px] text-gray-400">{seller}</p>
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-navy">${displayPrice.toFixed(2)}</span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">${price.toFixed(2)}</span>
              )}
            </div>
            <motion.button
              aria-label={`اشترِ ${title}`}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.88 }}
              className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center hover:bg-teal hover:text-white transition-all duration-200"
            >
              <ShoppingCartIcon size={14} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
