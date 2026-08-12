import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'تواصل معنا — سوق SouQ',
  description: 'تواصل مع فريق سوق عبر النموذج المباشر أو حسابات التواصل الاجتماعي.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="pt-40 pb-20 px-6 text-center"
          style={{ background: 'linear-gradient(160deg,#0a1929 0%,#16324f 55%,#0d2e1e 100%)' }}
        >
          <AnimatedSection className="max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-4">تواصل معنا</p>
            <h1 className="text-4xl font-black text-white mb-4">كيف يمكننا مساعدتك؟</h1>
            <p className="text-white/55 text-base">فريقنا جاهز للرد على استفساراتك خلال 24 ساعة</p>
          </AnimatedSection>
        </section>

        <section className="section bg-[#f7f9fc]">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
