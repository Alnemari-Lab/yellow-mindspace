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
              {/* Left hemisphere */}
              <path
                d="M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C60,160 30,130 30,90 C30,50 60,20 100,20 Z"
                fill="#F97316"
                className="opacity-90"
              />
              {/* Brain folds - left side */}
              <path
                d="M85,40 Q95,60 85,80 Q75,100 85,120 Q95,140 85,160"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                className="opacity-70"
              />
              <path
                d="M65,40 Q75,60 65,80 Q55,100 65,120 Q75,140 65,160"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                className="opacity-70"
              />
              {/* Brain folds - right side */}
              <path
                d="M115,40 Q125,60 115,80 Q105,100 115,120 Q125,140 115,160"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                className="opacity-70"
              />
              <path
                d="M135,40 Q145,60 135,80 Q125,100 135,120 Q145,140 135,160"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                className="opacity-70"
              />
              {/* Central divide */}
              <path
                d="M100,20 L100,160"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                className="opacity-70"
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