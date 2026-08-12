'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon, ShoppingCartIcon } from '@/components/Icons';
import { useCartStore } from '@/store/useCartStore';
import CartDrawer from '@/components/CartDrawer';

const navLinks = [
  { href: '/products',      label: 'المنتجات' },
  { href: '/blog',          label: 'المدونة'  },
  { href: '/faq',           label: 'الأسئلة الشائعة' },
  { href: '/about',         label: 'من نحن'   },
  { href: '/contact',       label: 'تواصل معنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname                  = usePathname();
  const isHomePage                = pathname === '/';

  const items = useCartStore((state) => state.items);
  const toggleCartOpen = useCartStore((state) => state.toggleCartOpen);
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const onDark  = isHomePage && !scrolled;
  const navBase = 'fixed top-0 inset-x-0 z-50 transition-all duration-500';
  const navBg   = onDark
    ? 'bg-transparent'
    : 'bg-white/[0.85] backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.05)]';

  return (
    <>
      <nav id="main-navbar" className={`${navBase} ${navBg}`}>
        <div className="container">
          <div className="flex items-center justify-between h-[66px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              id="navbar-logo"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-[10px] overflow-hidden ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-95">
                <Image
                  src="/logo.jpg"
                  alt="سوق"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className={`font-extrabold text-[17px] tracking-tight transition-colors duration-300 ${onDark ? 'text-white' : 'text-navy'}`}>
                سوق
              </span>
            </Link>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 ${
                    onDark
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-navy hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Desktop Auth & Cart ── */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleCartOpen}
                className={`relative p-2 me-2 rounded-xl transition-all duration-200 ${
                  onDark
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-navy hover:bg-black/5'
                }`}
                aria-label="سلة المشتريات"
              >
                <ShoppingCartIcon size={22} />
                {isMounted && cartItemsCount > 0 && (
                  <span className="absolute top-0 end-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <Link
                href="/login"
                id="navbar-login"
                className={`px-4 py-2 text-[13.5px] font-semibold rounded-xl transition-all duration-200 ${
                  onDark
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-navy hover:bg-black/5'
                }`}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                id="navbar-register"
                className="px-5 py-2.5 text-[13.5px] font-bold rounded-xl bg-teal text-white transition-all duration-200 hover:bg-[#0f6b5a] hover:shadow-[0_4px_20px_rgba(23,143,122,0.4)] active:scale-95"
              >
                ابدأ مجاناً
              </Link>
            </div>

            {/* ── Mobile Toggle ── */}
            <motion.button
              id="navbar-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                onDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-black/8'
              }`}
              whileTap={{ scale: 0.88 }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>

          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
              className="fixed top-0 end-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100">
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <Image src="/logo.jpg" alt="سوق" width={32} height={32} className="object-cover" />
                  </div>
                  <span className="font-extrabold text-navy">سوق</span>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      toggleCartOpen();
                    }}
                    className="relative p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCartIcon size={20} />
                    {isMounted && cartItemsCount > 0 && (
                      <span className="absolute top-0 end-0 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center translate-x-0.5 -translate-y-0.5">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                  <motion.button
                    onClick={() => setMenuOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                    whileTap={{ scale: 0.88 }}
                    aria-label="إغلاق"
                  >
                    <CloseIcon size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Links */}
              <div className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-2.5"
              >
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl font-bold text-navy border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl font-bold bg-teal text-white hover:bg-[#0f6b5a] transition-colors text-sm"
                >
                  ابدأ مجاناً
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}
