'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  slug: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
  gradient: string;
  textColor?: string;
}

export default function CategoryCard({
  slug,
  name,
  icon,
  count,
  gradient,
  textColor = 'white',
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      <Link
        href={`/products?category=${slug}`}
        id={`category-${slug}`}
        className="category-card flex flex-col items-center justify-center gap-3 p-6 text-center min-h-[130px] relative overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Subtle shine overlay */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }}
        />

        {/* Icon circle */}
        <div
          className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.18)' }}
        >
          <span style={{ color: textColor }}>{icon}</span>
        </div>

        <div className="relative z-10">
          <p className="font-bold text-[13.5px]" style={{ color: textColor }}>{name}</p>
          {count !== undefined && (
            <p className="text-[11px] mt-0.5" style={{ color: `${textColor}99` }}>
              {count.toLocaleString('ar-SA')} منتج
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
