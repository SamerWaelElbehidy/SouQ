'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  PlusIcon, PackageIcon, GridIcon, TrendingUpIcon,
  SettingsIcon, UserIcon, LogOutIcon, ShoppingCartIcon,
  CreditCardIcon, StarIcon,
} from '@/components/Icons';

interface UserInfo { userId: string; email: string }

const STATS = [
  { Icon: PackageIcon,    label: 'منتجاتي',   value: '0', color: 'text-navy',        bg: 'bg-navy/8' },
  { Icon: ShoppingCartIcon, label: 'الطلبات', value: '0', color: 'text-teal',        bg: 'bg-teal/8' },
  { Icon: CreditCardIcon, label: 'الأرباح',   value: '$0', color: 'text-amber-600',  bg: 'bg-amber-50' },
  { Icon: StarIcon,       label: 'التقييم',   value: '—',  color: 'text-purple-600', bg: 'bg-purple-50' },
];

const QUICK_ACTIONS = [
  { Icon: PlusIcon,       label: 'إضافة منتج جديد', href: '/dashboard/add-product', primary: true  },
  { Icon: GridIcon,       label: 'إدارة منتجاتي',   href: '/dashboard/products',    primary: false },
  { Icon: TrendingUpIcon, label: 'تقارير المبيعات', href: '/dashboard/analytics',   primary: false },
  { Icon: SettingsIcon,   label: 'إعدادات الحساب',  href: '/dashboard/settings',    primary: false },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser]       = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('souq_access_token');
    if (!token) { router.replace('/login'); return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ userId: payload.sub, email: payload.email ?? '' });
    } catch {
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem('souq_access_token');
    router.push('/login');
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-[#f7f9fc] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-teal border-t-transparent animate-spin" />
            <p className="text-gray-400 text-sm">جاري التحميل...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen bg-[#f7f9fc]">

        {/* Header */}
        <div
          className="relative overflow-hidden py-12"
          style={{ background: 'linear-gradient(135deg, #0a1929 0%, #0d2e1e 100%)' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="container relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <UserIcon className="text-white/70" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">لوحة التحكم</p>
                  <h1 className="text-xl font-black text-white">أهلاً بك</h1>
                  <p className="text-white/50 text-xs mt-0.5">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Link
                  href="/dashboard/add-product"
                  id="dashboard-add-product"
                  className="btn btn-primary text-sm py-2.5 px-5 gap-2 inline-flex items-center"
                >
                  <PlusIcon size={16} />
                  إضافة منتج
                </Link>
                <button
                  id="dashboard-logout"
                  onClick={handleLogout}
                  className="btn bg-white/8 text-white/70 border border-white/12 hover:bg-white/15 hover:text-white text-sm py-2.5 px-4 gap-2 inline-flex items-center transition-all"
                >
                  <LogOutIcon size={16} />
                  خروج
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ Icon, label, value, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22,1,0.36,1] }}
                className="card p-5"
              >
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="font-bold text-navy text-base mb-4">إجراءات سريعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUICK_ACTIONS.map(({ Icon, label, href, primary }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.5, ease: [0.22,1,0.36,1] }}
                >
                  <Link
                    href={href}
                    id={`action-${i}`}
                    className={`card p-5 flex flex-col items-center text-center gap-3 group h-full ${primary ? 'border-teal/20 hover:border-teal/50' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${primary ? 'bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white' : 'bg-navy/6 text-navy group-hover:bg-navy group-hover:text-white'}`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-xs font-bold transition-colors ${primary ? 'text-teal' : 'text-navy'}`}>
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* My products — empty state */}
          <div>
            <h2 className="font-bold text-navy text-base mb-4">منتجاتي</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="card p-14 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-navy/6 flex items-center justify-center mb-5 text-navy/30">
                <PackageIcon size={32} />
              </div>
              <h3 className="font-bold text-navy text-base mb-2">لا توجد منتجات بعد</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
                أضف أول منتج رقمي لك وابدأ في تحقيق الدخل اليوم
              </p>
              <Link
                href="/dashboard/add-product"
                id="empty-add-product"
                className="btn btn-primary gap-2 inline-flex items-center"
              >
                <PlusIcon size={16} />
                أضف منتجاً الآن
              </Link>
            </motion.div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
