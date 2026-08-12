'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterXIcon, InstagramIcon, SendIcon, StatusDotIcon } from '@/components/Icons';

const footerLinks = {
  company: [
    { label: 'عن سوق',          href: '/about'   },
    { label: 'المدونة',         href: '/blog'    },
    { label: 'تواصل معنا',      href: '/contact' },
    { label: 'الداعمون',        href: '/about#donors' },
  ],
  legal: [
    { label: 'الشروط والأحكام',   href: '/terms'        },
    { label: 'سياسة الخصوصية',   href: '/privacy'      },
    { label: 'سياسة الاسترداد',  href: '/refund-policy'},
    { label: 'الشارات والاعتمادات', href: '/badges'     },
  ],
  sellers: [
    { label: 'الأسئلة الشائعة',   href: '/faq'                      },
    { label: 'ابدأ البيع',         href: '/register'                  },
    { label: 'إضافة منتج',         href: '/dashboard/add-product'     },
    { label: 'مركز البائعين',      href: '/dashboard'                 },
  ],
};

const socialLinks = [
  { label: 'X / تويتر',   href: 'https://x.com',         Icon: TwitterXIcon },
  { label: 'إنستجرام',   href: 'https://instagram.com',  Icon: InstagramIcon },
  { label: 'تيليجرام',   href: 'https://t.me',          Icon: SendIcon },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1929] text-white" id="footer">
      {/* Top wave divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-95">
                <Image src="/logo.jpg" alt="سوق" width={40} height={40} className="object-cover" />
              </div>
              <span className="font-extrabold text-xl text-white">سوق</span>
            </Link>
            <p className="text-white/50 text-sm leading-[1.8] mb-7 max-w-[240px]">
              منصة عربية لبيع وشراء المنتجات الرقمية بأمان وموثوقية كاملة.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 bg-white/[0.06] border border-white/[0.08] hover:text-white hover:bg-white/[0.12] hover:border-teal/40 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.88 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'الشركة',    links: footerLinks.company },
            { title: 'للبائعين', links: footerLinks.sellers },
            { title: 'قانوني',   links: footerLinks.legal   },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-5">
                {title}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} سوق SouQ — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <StatusDotIcon className="text-teal animate-pulse" size={7} />
            <span>جميع الخدمات تعمل بشكل طبيعي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
