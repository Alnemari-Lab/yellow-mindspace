import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fff9e6]">
      <Hero />
      <Features />
      <footer className="bg-[#fff5d6] py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            {language === 'en' 
              ? '© 2025 Yellow Mindspace. All rights reserved.'
              : '© 2025 يلو مايندسبيس. جميع الحقوق محفوظة.'}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;