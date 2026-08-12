import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { HeartIcon, ShieldCheckIcon, StarIcon, SendIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'من نحن — سوق SouQ',
  description: 'تعرف على منصة سوق، رؤيتنا، فريقنا، والداعمين الكرام الذين يساعدوننا في بناء أفضل منصة عربية للخدمات الرقمية.',
};

const TEAM = [
  { name: 'سامر الراشد',   role: 'المؤسس والرئيس التنفيذي',       initials: 'س.ر', from: 'الرياض، السعودية' },
  { name: 'لينا العمري',   role: 'مديرة المنتج والتجربة',         initials: 'ل.ع', from: 'دبي، الإمارات'   },
  { name: 'خالد السعيد',   role: 'مهندس البنية التحتية',          initials: 'خ.س', from: 'الكويت'           },
];

const DONORS: { name: string; amount?: string; message?: string }[] = [
  // Donors are added dynamically from the admin dashboard.
  // This array is a placeholder — in production it's fetched from the API.
];

const VALUES = [
  { Icon: ShieldCheckIcon, title: 'الأمان أولاً',   desc: 'كل المعاملات مشفّرة ومحمية بأعلى معايير الأمان.' },
  { Icon: StarIcon,        title: 'الجودة',          desc: 'كل منتج يُراجع يدوياً قبل نشره لضمان جودته.' },
  { Icon: HeartIcon,       title: 'المجتمع',         desc: 'نبني منصة يفخر بها المجتمع العربي.' },
  { Icon: SendIcon,        title: 'الشفافية',        desc: 'نتواصل مع مستخدمينا بصدق ووضوح دائماً.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden pt-40 pb-24 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}
        >
          <div aria-hidden className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <AnimatedSection className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">من نحن</p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5 whitespace-nowrap">
              منصة عربية بُنيت على{' '}
              <span style={{ background:'linear-gradient(135deg,#178f7a 30%,#4ade80 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                الثقة
              </span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              سوق هي منصة عربية تستهدف أصحاب المتاجر والأفراد لبيع وشراء الخدمات والمنتجات الرقمية بأمان تام.
            </p>
          </AnimatedSection>
        </section>

        {/* ── Mission ── */}
        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="right">
                <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">رسالتنا</p>
                <h2 className="section-title mb-5">لماذا سوق؟</h2>
                <p className="text-gray-500 leading-[1.9] mb-4">
                  أدركنا أن المجتمع العربي يفتقر إلى منصة رقمية موثوقة تجمع البائعين والمشترين في مكان آمن ومنظّم.
                </p>
                <p className="text-gray-500 leading-[1.9]">
                  هدفنا ليس فقط تحقيق الأرباح — بل بناء سمعة وثقة تجعل من سوق الخيار الأول لكل من يريد بيع أو شراء خدمة رقمية في العالم العربي.
                </p>
              </AnimatedSection>
              <AnimatedSection direction="left">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: '+10K', l: 'منتج رقمي' },
                    { n: '+5K',  l: 'بائع نشط' },
                    { n: '100%', l: 'معاملات آمنة' },
                    { n: '24/7', l: 'دعم فني' },
                  ].map(({ n, l }) => (
                    <div key={l} className="card p-5 text-center">
                      <p className="text-2xl font-black text-navy mb-1">{n}</p>
                      <p className="text-gray-400 text-xs">{l}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section bg-[#f7f9fc]">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <p className="text-[11px] font-bold uppercase tracking-widest text-navy/40 mb-3">قيمنا</p>
              <h2 className="section-title">ما نؤمن به</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map(({ Icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={i * 0.08}>
                  <div className="card p-6 text-center group hover:border-teal/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-teal/8 text-teal flex items-center justify-center mx-auto mb-4 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="section bg-white">
          <div className="container max-w-3xl">
            <AnimatedSection className="text-center mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-navy/40 mb-3">الفريق</p>
              <h2 className="section-title">من يدير سوق</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TEAM.map(({ name, role, initials, from }, i) => (
                <AnimatedSection key={name} delay={i * 0.1}>
                  <div className="card p-6 text-center group hover:border-teal/30 transition-colors">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-lg font-black text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#16324f,#178f7a)' }}
                    >
                      {initials}
                    </div>
                    <p className="font-bold text-navy">{name}</p>
                    <p className="text-teal text-xs font-medium mt-1">{role}</p>
                    <p className="text-gray-400 text-xs mt-1">{from}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Donors ── */}
        <section className="section bg-[#f7f9fc]">
          <div className="container max-w-3xl">
            <AnimatedSection className="text-center mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-3">الداعمون</p>
              <h2 className="section-title">شكر وتقدير</h2>
              <p className="section-subtitle mt-2">هؤلاء هم من دعموا المنصة مادياً وساعدوا في نموها</p>
            </AnimatedSection>

            {DONORS.length === 0 ? (
              <AnimatedSection>
                <div className="card p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-5">
                    <HeartIcon size={28} />
                  </div>
                  <h3 className="font-bold text-navy mb-2">كن أول الداعمين</h3>
                  <p className="text-gray-400 text-sm mb-6">ساعد في نمو المنصة واحصل على شكر مؤبد في هذه الصفحة</p>
                  <Link href="/#donate" className="btn btn-primary inline-flex">
                    دعم المنصة
                  </Link>
                </div>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DONORS.map((d, i) => (
                  <AnimatedSection key={i} delay={i * 0.06}>
                    <div className="card p-5 text-center">
                      <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                        style={{ background: 'linear-gradient(135deg,#178f7a,#16324f)' }}>
                        {d.name.charAt(0)}
                      </div>
                      <p className="font-bold text-navy text-sm">{d.name}</p>
                      {d.message && <p className="text-gray-400 text-xs mt-1">"{d.message}"</p>}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section bg-[#0a1929] text-center">
          <AnimatedSection className="max-w-xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-4">انضم لمجتمع سوق</h2>
            <p className="text-white/50 mb-8">سجّل الآن وابدأ رحلتك كبائع أو مشترٍ</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/register" className="btn btn-primary px-8 py-3.5">إنشاء حساب</Link>
              <Link href="/contact" className="btn bg-white/8 text-white border border-white/12 hover:bg-white/15 transition-all px-8 py-3.5">تواصل معنا</Link>
            </div>
          </AnimatedSection>
        </section>

      </main>
      <Footer />
    </>
  );
}
