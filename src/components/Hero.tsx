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
              <path
                d="M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C60,160 30,130 30,90 C30,50 60,20 100,20 Z"
                fill="#F97316"
                className="opacity-90"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C60,160 30,130 30,90 C30,50 60,20 100,20 Z;
                    M100,20 C150,20 180,60 160,100 C140,140 120,160 100,160 C80,160 60,140 40,100 C20,60 50,20 100,20 Z;
                    M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C60,160 30,130 30,90 C30,50 60,20 100,20 Z"
                  />
              </path>
              <path
                d="M100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C70,140 50,120 50,90 C50,60 70,40 100,40 Z"
                fill="#F97316"
                className="opacity-70"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C70,140 50,120 50,90 C50,60 70,40 100,40 Z;
                    M100,40 C140,40 160,70 140,100 C120,130 110,140 100,140 C90,140 80,130 60,100 C40,70 60,40 100,40 Z;
                    M100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C70,140 50,120 50,90 C50,60 70,40 100,40 Z"
                  />
              </path>
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