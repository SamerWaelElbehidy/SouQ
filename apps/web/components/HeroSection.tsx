'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CodeIcon, PenToolIcon, ShieldCheckIcon, ZapIcon,
  BookOpenIcon, SearchIcon, CreditCardIcon, PackageIcon,
} from '@/components/Icons';

/* Floating icon cards around the hero */
const FLOATERS = [
  { Icon: CodeIcon,         label: 'برمجيات',    top: '18%', start: '6%',  delay: 0,    rotate: -8  },
  { Icon: PenToolIcon,      label: 'تصميم',     top: '14%', end: '8%',    delay: 0.3,  rotate: 7   },
  { Icon: ShieldCheckIcon,  label: 'موثّق',     top: '68%', start: '4%',  delay: 0.6,  rotate: -5  },
  { Icon: BookOpenIcon,     label: 'كورسات',    top: '72%', end: '6%',    delay: 0.9,  rotate: 6   },
  { Icon: ZapIcon,          label: 'تسليم فوري', top: '38%', start: '2%',  delay: 0.45, rotate: -10 },
  { Icon: PackageIcon,      label: 'منتجات',    top: '42%', end: '3%',    delay: 0.75, rotate: 8   },
];

const STATS = [
  { value: '+10,000', label: 'منتج رقمي' },
  { value: '+5,200',  label: 'بائع نشط'  },
  { value: '+28,000', label: 'عملية بيع'  },
  { value: '4.9',     label: 'تقييم'      },
];

/* Floating animation for icon cards */
const floatVariants = (delay: number) => ({
  animate: {
    y: [0, -12, 0],
    rotate: [0, 1, 0],
    transition: {
      duration: 5 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6"
      style={{ background: 'linear-gradient(160deg, #0a1929 0%, #16324f 55%, #0d2e1e 100%)' }}
    >
      {/* ── Background grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div
        aria-hidden
        className="absolute top-0 start-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(23,143,122,0.18) 0%, transparent 65%)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 end-1/4 w-[400px] h-[400px] translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(22,50,79,0.4) 0%, transparent 65%)' }}
      />

      {/* ── Floating icon cards (desktop) ── */}
      {FLOATERS.map(({ Icon, label, top, start, end, delay, rotate }, i) => (
        <motion.div
          key={i}
          className="hidden lg:flex absolute flex-col items-center gap-2 pointer-events-none"
          style={{ top, ...(start ? { left: start } : { right: end }) }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + delay * 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [rotate, rotate + 2, rotate] }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Icon className="text-white/70" size={22} />
          </motion.div>
          <span className="text-white/40 text-[10px] font-medium">{label}</span>
        </motion.div>
      ))}

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-teal/30 bg-teal/[0.08] text-teal text-[13px] font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse inline-block" />
          منصة عربية رائدة للمنتجات الرقمية
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-white leading-[1.2] mb-6 tracking-tight"
          style={{ fontSize: 'clamp(1.25rem, 6.5vw, 4rem)' }}
        >
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
            اشترِ وبِع{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #178f7a 30%, #4ade80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              المنتجات الرقمية
            </span>
          </span>
          <span style={{ display: 'block' }} className="text-white/90">
            بكل أمان وسهولة
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/55 text-base md:text-lg leading-[1.8] max-w-xl mx-auto mb-10"
        >
          أكواد، تصاميم، كورسات، وقوالب — كل ما تحتاجه في مكان واحد.
          دفع بالعملات الرقمية والبطاقات البنكية.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 max-w-lg mx-auto mb-10 p-2 rounded-2xl border border-white/[0.12] bg-white/[0.07] backdrop-blur-xl"
        >
          <SearchIcon className="text-white/30 ms-2 shrink-0" size={18} />
          <input
            type="search"
            placeholder="ابحث عن منتجات، أكواد، تصاميم..."
            aria-label="بحث"
            id="hero-search"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/30 text-sm min-w-0"
          />
          <Link
            href="/products"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-teal text-white text-sm font-bold hover:bg-[#0f6b5a] transition-colors active:scale-95"
          >
            بحث
          </Link>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-6"
        >
          {/* Primary — ابدأ مجاناً */}
          <motion.a
            href="/register"
            id="hero-register"
            className="relative px-8 py-4 rounded-2xl bg-white text-navy font-black text-[15px] overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 0 6px rgba(255,255,255,0.12), 0 8px 40px rgba(255,255,255,0.25)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            {/* Shine sweep on hover */}
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
            <span className="relative">ابدأ مجاناً</span>
          </motion.a>

          {/* Secondary — تصفّح المنتجات */}
          <motion.a
            href="/products"
            id="hero-browse"
            className="relative px-8 py-4 rounded-2xl font-semibold text-[15px] text-white/75 border border-white/15"
            whileHover={{
              scale: 1.04,
              color: 'rgba(255,255,255,1)',
              borderColor: 'rgba(255,255,255,0.45)',
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            تصفّح المنتجات
          </motion.a>
        </motion.div>


        {/* Stats row - Hiding from user view as requested */}
        {false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-px relative z-10"
          >
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center px-6 py-4 border-s border-white/[0.08] first:border-s-0"
              >
                <span className="text-2xl font-black text-white">{value}</span>
                <span className="text-white/40 text-[11px] mt-0.5">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom fade to next section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #f7f9fc)' }}
      />
    </section>
  );
}
