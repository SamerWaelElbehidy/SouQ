import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const tajawal = localFont({
  src: [
    { path: './fonts/Tajawal-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Tajawal-Medium.ttf',  weight: '500', style: 'normal' },
    { path: './fonts/Tajawal-Bold.ttf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'سوق SouQ — منصة المنتجات الرقمية',
    template: '%s | سوق SouQ',
  },
  description:
    'منصة عربية لبيع وشراء الخدمات والمنتجات الرقمية بأمان — دفع بالعملات الرقمية والبطاقات البنكية، وحماية كاملة لكل معاملة.',
  keywords: ['منتجات رقمية', 'سوق', 'بيع وشراء', 'أكواد', 'خدمات رقمية', 'SouQ'],
  authors: [{ name: 'سوق SouQ' }],
  creator: 'سوق SouQ',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://souq.sa',
    siteName: 'سوق SouQ',
    title: 'سوق SouQ — منصة المنتجات الرقمية',
    description: 'منصة عربية لبيع وشراء الخدمات والمنتجات الرقمية بأمان.',
    images: [{ url: '/logo.jpg', width: 1080, height: 1080, alt: 'سوق SouQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سوق SouQ',
    description: 'منصة عربية لبيع وشراء الخدمات والمنتجات الرقمية.',
    images: ['/logo.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${tajawal.variable} font-tajawal antialiased text-[#1c2230]`}>
        {children}
      </body>
    </html>
  );
}
