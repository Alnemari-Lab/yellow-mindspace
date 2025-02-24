
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Discover Your Perfect Major",
      titleSpan: "",
      description: "Use AI-powered analysis and face recognition to find the academic path that matches your unique potential.",
      getStarted: "Get Started",
      login: "Login"
    },
    ar: {
      title: "اكتشف شخصيتك",
      titleSpan: "اكتشف تخصصك",
      description: "مرحبا بكم في موقعنا حيث نوفر الاختبارالقادر علي تحليل شخصيتكم وتخصصكم بدقة",
      getStarted: "ابدأ الآن",
      login: "تسجيل الدخول"
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff5d6]">
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-3xl mx-auto text-center relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="w-32 h-32 mx-auto mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Abstract human head shape */}
              <path
                d="M100,20 
                   C130,20 150,40 150,70
                   C150,90 140,110 130,120
                   C120,130 110,140 100,150
                   C90,140 80,130 70,120
                   C60,110 50,90 50,70
                   C50,40 70,20 100,20"
                fill="#4B5563"
                className="opacity-80"
              />
              {/* Abstract shoulders */}
              <path
                d="M60,120
                   C60,140 80,160 100,160
                   C120,160 140,140 140,120"
                fill="none"
                stroke="#4B5563"
                strokeWidth="3"
                className="opacity-60"
              />
              {/* Abstract facial features */}
              <circle cx="80" cy="70" r="3" fill="#4B5563" className="opacity-70" />
              <circle cx="120" cy="70" r="3" fill="#4B5563" className="opacity-70" />
              <path
                d="M85,90 C95,100 105,100 115,90"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
                className="opacity-60"
              />
            </svg>
          </div>
          <h1 className="text-7xl font-bold mb-6 text-gray-900 tracking-tight">
            {currentContent.title}
            <span className="block text-secondary mt-2">{currentContent.titleSpan}</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            {currentContent.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/register">{currentContent.getStarted}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">{currentContent.login}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
