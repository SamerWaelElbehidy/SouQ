import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { ShieldCheckIcon, StarIcon, CheckIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'الشارات والاعتمادات — سوق SouQ',
  description: 'تعرّف على نظام الشارات في منصة سوق وما الفرق بين كل شارة وأخرى وكيف تحصل عليها.',
};

const BADGES = [
  {
    id: 'verified',
    name: 'موثّق',
    nameEn: 'Verified',
    color: '#178f7a',
    bg: 'linear-gradient(135deg,#178f7a,#0f6b5a)',
    description: 'يحصل عليها كل مستخدم بعد التحقق من بريده الإلكتروني وإتمام بيانات الحساب.',
    requirements: ['تفعيل البريد الإلكتروني', 'إكمال بيانات الملف الشخصي'],
    icon: CheckIcon,
    level: 1,
  },
  {
    id: 'trusted-seller',
    name: 'بائع موثوق',
    nameEn: 'Trusted Seller',
    color: '#0369a1',
    bg: 'linear-gradient(135deg,#0369a1,#075985)',
    description: 'تُمنح للبائعين ذوي السجل النظيف والتقييمات الإيجابية المستمرة.',
    requirements: ['أكثر من 10 مبيعات ناجحة', 'تقييم 4.5+ من المشترين', 'لا توجد شكاوى غير محلولة'],
    icon: StarIcon,
    level: 2,
  },
  {
    id: 'premium',
    name: 'بائع مميز',
    nameEn: 'Premium Seller',
    color: '#b45309',
    bg: 'linear-gradient(135deg,#b45309,#92400e)',
    description: 'أعلى مستوى للبائعين. يعني أن المنصة تُوصي بهذا البائع بشكل شخصي.',
    requirements: [
      'أكثر من 50 مبيعة ناجحة',
      'تقييم 4.8+ من المشترين',
      'عضوية لا تقل عن 3 أشهر',
      'مراجعة يدوية من فريق سوق',
    ],
    icon: ShieldCheckIcon,
    level: 3,
  },
  {
    id: 'supporter',
    name: 'داعم المنصة',
    nameEn: 'Platform Supporter',
    color: '#9d174d',
    bg: 'linear-gradient(135deg,#9d174d,#831843)',
    description: 'تُهدى لكل من ساهم مادياً في دعم منصة سوق وتطويرها.',
    requirements: ['التبرع لدعم المنصة عبر صفحة "دعم المنصة"'],
    icon: CheckIcon,
    level: 1,
  },
];

export default function BadgesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}>
          <AnimatedSection className="max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">الشارات والاعتمادات</p>
            <h1 className="text-4xl font-black text-white mb-4">نظام الثقة في سوق</h1>
            <p className="text-white/55 text-base leading-relaxed">
              الشارات طريقتنا لمساعدتك في التمييز بين البائعين. كل شارة تعني شيئاً محدداً وتُمنح بمعايير واضحة.
            </p>
          </AnimatedSection>
        </section>

        {/* Badges grid */}
        <section className="section bg-[#f7f9fc]">
          <div className="container max-w-4xl">
            <AnimatedSection className="text-center mb-12">
              <h2 className="section-title">أنواع الشارات</h2>
              <p className="section-subtitle mt-2">كل شارة تعكس مستوى من الموثوقية والجودة</p>
            </AnimatedSection>

            <div className="flex flex-col gap-6">
              {BADGES.map(({ id, name, nameEn, color, bg, description, requirements, icon: Icon, level }, i) => (
                <AnimatedSection key={id} delay={i * 0.1} direction="up">
                  <div className="card p-7 flex flex-col sm:flex-row gap-6 items-start group hover:border-teal/20 transition-colors">

                    {/* Badge icon */}
                    <div className="shrink-0">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                        style={{ background: bg }}
                      >
                        <Icon className="text-white" size={26} />
                      </div>
                      {/* Level dots */}
                      <div className="flex gap-1 justify-center mt-2">
                        {[1, 2, 3].map(l => (
                          <span key={l} className="w-2 h-2 rounded-full transition-colors duration-300"
                            style={{ background: l <= level ? color : '#e2e8f0' }} />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-navy text-lg">{name}</h3>
                        <span className="text-xs font-mono text-gray-400">{nameEn}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                          متطلبات الحصول عليها
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {requirements.map(req => (
                            <li key={req} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: `${color}20`, color }}>
                                <CheckIcon size={10} />
                              </span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-12 card p-8 text-center" delay={0.4}>
              <ShieldCheckIcon className="text-teal mx-auto mb-4" size={32} />
              <h3 className="font-black text-navy text-lg mb-2">الشارات تُمنح تلقائياً</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
                لا تحتاج لطلبها — يراقب نظامنا نشاطك باستمرار ويمنحك الشارة فور استيفاء الشروط.
                يمكن للإدارة أيضاً منحها أو سحبها يدوياً.
              </p>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
