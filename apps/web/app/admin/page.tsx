'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  GridIcon, PackageIcon, UserIcon, ShieldCheckIcon,
  CheckIcon, CloseIcon, AlertCircleIcon, SettingsIcon,
  BookOpenIcon, BarChartIcon, LogOutIcon, MenuIcon,
  EyeIcon, TagIcon,
} from '@/components/Icons';

// ── Types ─────────────────────────────────────────────────
type Tab = 'overview' | 'products' | 'users' | 'blog' | 'settings';

interface MockProduct {
  id: string; title: string; seller: string; category: string; price: number; status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
interface MockUser {
  id: string; name: string; email: string; isBlocked: boolean; badge?: string; joinDate: string; productsCount: number;
}

// ── Mock data (replaced by real API in Phase 3) ──────────
const MOCK_PRODUCTS: MockProduct[] = [
  { id: '1', title: 'نظام إدارة متجر إلكتروني',  seller: 'dev_masters',   category: 'برمجيات', price: 89,  status: 'PENDING'  },
  { id: '2', title: 'حزمة قوالب UI/UX',          seller: 'pixel_studio',  category: 'تصميم',   price: 49,  status: 'PENDING'  },
  { id: '3', title: 'كورس تعلم الذكاء الاصطناعي', seller: 'ai_academy',    category: 'كورسات',  price: 99,  status: 'APPROVED' },
  { id: '4', title: 'بوت تيليجرام متقدم',          seller: 'bot_forge',     category: 'برمجيات', price: 59,  status: 'REJECTED' },
  { id: '5', title: 'قالب موقع شركة',             seller: 'web_craft',     category: 'قوالب',   price: 45,  status: 'PENDING'  },
];

const MOCK_USERS: MockUser[] = [
  { id: '1', name: 'محمد العتيبي',   email: 'mohammed@example.com', isBlocked: false, badge: 'trusted-seller', joinDate: '2026-06-01', productsCount: 12 },
  { id: '2', name: 'سارة الزهراني',  email: 'sara@example.com',     isBlocked: false, badge: undefined,        joinDate: '2026-07-15', productsCount: 3  },
  { id: '3', name: 'خالد المطيري',   email: 'khalid@example.com',   isBlocked: true,  badge: undefined,        joinDate: '2026-05-20', productsCount: 0  },
  { id: '4', name: 'نورة القحطاني',  email: 'noura@example.com',    isBlocked: false, badge: 'premium',        joinDate: '2026-04-10', productsCount: 27 },
];

const STATUS_CONFIG = {
  PENDING:  { label: 'قيد المراجعة', cls: 'bg-amber-50 text-amber-700 border-amber-200/60' },
  APPROVED: { label: 'مُعتمد',       cls: 'bg-teal/10 text-teal border-teal/20'            },
  REJECTED: { label: 'مرفوض',        cls: 'bg-red-50 text-red-600 border-red-200/60'       },
};

// ── Sidebar nav items ─────────────────────────────────────
const NAV_ITEMS: { id: Tab; label: string; Icon: React.FC<{className?:string; size?:number}> }[] = [
  { id: 'overview',  label: 'نظرة عامة',    Icon: GridIcon        },
  { id: 'products',  label: 'المنتجات',     Icon: PackageIcon     },
  { id: 'users',     label: 'المستخدمون',   Icon: UserIcon        },
  { id: 'blog',      label: 'المدونة',      Icon: BookOpenIcon    },
  { id: 'settings',  label: 'الإعدادات',   Icon: SettingsIcon    },
];

export default function AdminDashboard() {
  const [tab, setTab]           = useState<Tab>('overview');
  const [sidebarOpen, setSidebar] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [users, setUsers]       = useState(MOCK_USERS);

  function updateProductStatus(id: string, status: 'APPROVED' | 'REJECTED') {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }

  function toggleBlockUser(id: string) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u));
  }

  const pending   = products.filter(p => p.status === 'PENDING').length;
  const approved  = products.filter(p => p.status === 'APPROVED').length;
  const blocked   = users.filter(u => u.isBlocked).length;

  const STATS = [
    { label: 'منتجات بانتظار المراجعة', value: pending,          color: 'text-amber-600',  bg: 'bg-amber-50',    Icon: PackageIcon    },
    { label: 'منتجات مُعتمدة',          value: approved,         color: 'text-teal',       bg: 'bg-teal/8',      Icon: CheckIcon      },
    { label: 'إجمالي المستخدمين',       value: users.length,     color: 'text-navy',       bg: 'bg-navy/6',      Icon: UserIcon       },
    { label: 'مستخدمون محظورون',       value: blocked,          color: 'text-red-500',    bg: 'bg-red-50',      Icon: AlertCircleIcon},
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex" dir="rtl">

      {/* ── Sidebar ────────────────────────────────────── */}
      <AnimatePresence>
        {(sidebarOpen) && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebar(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed top-0 right-0 bottom-0 z-50 w-[230px] bg-[#0a1929] flex flex-col
        transition-transform duration-300 md:translate-x-0 md:static md:flex
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#178f7a,#16324f)' }}>س</div>
            <div>
              <p className="text-white font-black text-sm">سوق</p>
              <p className="text-white/30 text-[10px]">لوحة الأدمن</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`admin-nav-${id}`}
              onClick={() => { setTab(id); setSidebar(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 text-right ${
                tab === id
                  ? 'bg-teal/20 text-teal'
                  : 'text-white/50 hover:bg-white/6 hover:text-white'
              }`}
            >
              <Icon size={17} />
              {label}
              {id === 'products' && pending > 0 && (
                <span className="mr-auto px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">{pending}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/[0.07]">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/6 text-sm transition-all">
            <LogOutIcon size={16} />
            الخروج للموقع
          </Link>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            className="md:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
            onClick={() => setSidebar(v => !v)}
            aria-label="القائمة"
          >
            <MenuIcon size={20} />
          </button>
          <div>
            <h1 className="font-black text-navy text-base">
              {NAV_ITEMS.find(n => n.id === tab)?.label}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">لوحة إدارة سوق SouQ</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: 'linear-gradient(135deg,#178f7a,#16324f)' }}>أ</div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-5 md:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* ── OVERVIEW ─────────────────────────── */}
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS.map(({ label, value, color, bg, Icon }, i) => (
                      <motion.div key={label}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                      >
                        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-4 ${color}`}>
                          <Icon size={18} />
                        </div>
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                        <p className="text-gray-400 text-xs mt-1">{label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pending products quick review */}
                  {pending > 0 && (
                    <div className="bg-white rounded-2xl border border-amber-200/50 shadow-sm overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                        <AlertCircleIcon size={16} className="text-amber-500" />
                        <h2 className="font-bold text-navy text-sm">{pending} منتج بانتظار موافقتك</h2>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {products.filter(p => p.status === 'PENDING').map(p => (
                          <PendingProductRow key={p.id} product={p} onApprove={() => updateProductStatus(p.id, 'APPROVED')} onReject={() => updateProductStatus(p.id, 'REJECTED')} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── PRODUCTS ─────────────────────────── */}
              {tab === 'products' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-navy">كل المنتجات ({products.length})</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {products.map(p => (
                      <PendingProductRow key={p.id} product={p}
                        onApprove={() => updateProductStatus(p.id, 'APPROVED')}
                        onReject={() => updateProductStatus(p.id, 'REJECTED')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── USERS ────────────────────────────── */}
              {tab === 'users' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-navy">المستخدمون ({users.length})</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {users.map(u => (
                      <UserRow key={u.id} user={u} onToggleBlock={() => toggleBlockUser(u.id)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── BLOG ─────────────────────────────── */}
              {tab === 'blog' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <BookOpenIcon className="text-navy/30 mx-auto mb-4" size={40} />
                  <h3 className="font-bold text-navy mb-2">إدارة المدونة</h3>
                  <p className="text-gray-400 text-sm mb-6">إنشاء وتعديل مقالات المدونة — متاح في المرحلة الثالثة</p>
                  <Link href="/blog" className="btn btn-primary inline-flex">معاينة المدونة</Link>
                </div>
              )}

              {/* ── SETTINGS ─────────────────────────── */}
              {tab === 'settings' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <SettingsIcon className="text-navy/30 mx-auto mb-4" size={40} />
                  <h3 className="font-bold text-navy mb-2">الإعدادات</h3>
                  <p className="text-gray-400 text-sm">تعديل محتوى "من نحن"، الشارات، الـ FAQ، والإعدادات العامة — متاح في المرحلة الثالثة</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────

function PendingProductRow({
  product, onApprove, onReject,
}: {
  product: MockProduct;
  onApprove: () => void;
  onReject: () => void;
}) {
  const cfg = STATUS_CONFIG[product.status];
  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-navy text-sm truncate">{product.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-400">{product.seller}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-teal font-medium">{product.category}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs font-bold text-navy">${product.price}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-bold ${cfg.cls}`}>
          {cfg.label}
        </span>
        {product.status === 'PENDING' && (
          <>
            <motion.button
              id={`approve-${product.id}`}
              onClick={onApprove}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg bg-teal/10 text-teal hover:bg-teal hover:text-white transition-all flex items-center justify-center"
              title="قبول"
            >
              <CheckIcon size={14} />
            </motion.button>
            <motion.button
              id={`reject-${product.id}`}
              onClick={onReject}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
              title="رفض"
            >
              <CloseIcon size={14} />
            </motion.button>
          </>
        )}
        <motion.button
          id={`view-product-${product.id}`}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg bg-navy/6 text-navy hover:bg-navy hover:text-white transition-all flex items-center justify-center"
          title="عرض"
        >
          <EyeIcon size={14} />
        </motion.button>
      </div>
    </div>
  );
}

function UserRow({ user, onToggleBlock }: { user: MockUser; onToggleBlock: () => void }) {
  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: user.isBlocked ? '#e2e8f0' : 'linear-gradient(135deg,#178f7a,#16324f)' }}>
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-navy text-sm truncate">{user.name}</p>
            {user.badge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal/10 text-teal text-[10px] font-bold">
                <TagIcon size={8} /> {user.badge}
              </span>
            )}
            {user.isBlocked && (
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold border border-red-200/60">محظور</span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{user.email} · {user.productsCount} منتج · انضم {user.joinDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <motion.button
          id={`block-user-${user.id}`}
          onClick={onToggleBlock}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            user.isBlocked
              ? 'bg-teal/10 text-teal hover:bg-teal hover:text-white'
              : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'
          }`}
        >
          {user.isBlocked ? 'فك الحظر' : 'حظر'}
        </motion.button>
        <motion.button
          id={`view-user-${user.id}`}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg bg-navy/6 text-navy hover:bg-navy hover:text-white transition-all flex items-center justify-center"
        >
          <EyeIcon size={14} />
        </motion.button>
      </div>
    </div>
  );
}
