import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'الشروط والأحكام — سوق SouQ',
  description: 'اقرأ شروط وأحكام استخدام منصة سوق SouQ قبل التسجيل أو الشراء.',
};

const SECTIONS = [
  {
    title: '1. القبول والموافقة',
    content: `باستخدامك لمنصة سوق (SouQ)، فإنك توافق على الالتزام بهذه الشروط والأحكام بشكل كامل. إذا كنت لا توافق على أي جزء منها، يرجى التوقف عن استخدام المنصة فوراً.

هذه الشروط تسري على جميع مستخدمي المنصة سواء أكانوا بائعين أم مشترين أم زوّاراً.`,
  },
  {
    title: '2. الاستخدام المسموح به',
    content: `يحق لك استخدام المنصة لأغراض قانونية مشروعة فقط. يُحظر تماماً:
- بيع أي محتوى مخالف للأنظمة والقوانين السعودية والدولية
- الاحتيال أو التضليل على المستخدمين الآخرين
- محاولة اختراق أو إلحاق الضرر بالمنصة أو مستخدميها
- استخدام بيانات مزوّرة أو انتحال هوية شخص آخر
- نشر محتوى إباحي أو عنيف أو مسيء`,
  },
  {
    title: '3. الحسابات وأمن البيانات',
    content: `أنت مسؤول عن الحفاظ على سرية بيانات حسابك. يجب أن تُبلغنا فوراً عن أي استخدام غير مصرح به لحسابك.

نحن نستخدم أعلى معايير التشفير لحماية بياناتك. لا نشارك بياناتك الشخصية مع أي طرف ثالث إلا بموافقتك الصريحة أو بموجب أمر قضائي.`,
  },
  {
    title: '4. المنتجات والخدمات',
    content: `كل منتج يُعرض على المنصة يمر بمراجعة يدوية قبل النشر. المنصة تتحمل مسؤولية التحقق من أن المنتج يعمل كما هو موصوف. البائع يتحمل المسؤولية الكاملة عن دقة وصف منتجه.

في حال اكتشاف منتج مخالف بعد نشره، يحق للمنصة حذفه فوراً دون إشعار.`,
  },
  {
    title: '5. المدفوعات والاسترداد',
    content: `جميع المدفوعات تتم عبر Binance Pay وهي آمنة ومشفّرة. تُستقطع رسوم المنصة تلقائياً قبل تحويل المبلغ للبائع.

سياسة الاسترداد: يحق للمشتري طلب الاسترداد خلال 7 أيام من الشراء إذا كان المنتج لا يعمل كما هو موصوف. يدرس فريقنا كل طلب على حدة ويصدر قراره خلال 48 ساعة.`,
  },
  {
    title: '6. الملكية الفكرية',
    content: `البائع يضمن امتلاكه الحقوق الكاملة لكل محتوى يبيعه. المنصة ليست مسؤولة عن أي انتهاك لحقوق الملكية الفكرية يرتكبه البائع.

عند الشراء، يحصل المشتري على ترخيص استخدام شخصي فقط إلا إذا نصّ المنتج على غير ذلك.`,
  },
  {
    title: '7. المسؤولية والتعويض',
    content: `المنصة لا تتحمل أي مسؤولية عن الأضرار غير المباشرة أو العرضية الناتجة عن استخدام أي منتج. الحد الأقصى لمسؤولية المنصة هو قيمة المبلغ المدفوع فعلياً.

أنت توافق على تعويض المنصة عن أي مطالبات أو خسائر ناتجة عن مخالفتك لهذه الشروط.`,
  },
  {
    title: '8. تعديل الشروط',
    content: `يحق للمنصة تعديل هذه الشروط في أي وقت. سيُبلَّغ المستخدمون عبر البريد الإلكتروني قبل 7 أيام من أي تغيير جوهري. الاستمرار في استخدام المنصة بعد التغيير يُعدّ موافقة ضمنية.`,
  },
  {
    title: '9. القانون الحاكم',
    content: `تخضع هذه الشروط للقوانين المعمول بها في المملكة العربية السعودية. أي نزاع يُحال للجهات القضائية المختصة في المملكة.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}>
          <AnimatedSection className="max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">قانوني</p>
            <h1 className="text-4xl font-black text-white mb-4">الشروط والأحكام</h1>
            <p className="text-white/55 text-sm">آخر تحديث: أغسطس 2026</p>
          </AnimatedSection>
        </section>

        {/* Content */}
        <section className="section bg-[#f7f9fc]">
          <div className="container max-w-3xl">
            <AnimatedSection className="card p-8 mb-6 bg-amber-50 border-amber-200/60">
              <p className="text-amber-800 text-sm leading-relaxed font-medium">
                يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة. باستخدامك للمنصة فإنك تُقرّ بأنك قرأت هذه الشروط وفهمتها ووافقت عليها.
              </p>
            </AnimatedSection>

            <div className="flex flex-col gap-5">
              {SECTIONS.map(({ title, content }, i) => (
                <AnimatedSection key={title} delay={i * 0.05}>
                  <div className="card p-7">
                    <h2 className="font-black text-navy text-base mb-4 pb-3 border-b border-gray-100">{title}</h2>
                    <div className="text-gray-500 text-sm leading-[2] whitespace-pre-line">{content}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-8 text-center" delay={0.5}>
              <p className="text-gray-400 text-sm">
                للاستفسار عن أي بند، تواصل معنا عبر{' '}
                <a href="/contact" className="text-teal hover:underline font-medium">صفحة التواصل</a>
              </p>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
