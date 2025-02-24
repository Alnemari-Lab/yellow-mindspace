
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
          <div className="w-40 h-40 mx-auto mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Main brain shape */}
              <path
                d="M100,30 
                   C140,30 170,60 170,100 
                   C170,140 140,170 100,170
                   C60,170 30,140 30,100
                   C30,60 60,30 100,30"
                fill="#8B5CF6"
                className="opacity-20"
              />
              {/* Neural network connections */}
              <path
                d="M70,80 Q100,60 130,80
                   M70,100 Q100,80 130,100
                   M70,120 Q100,140 130,120"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                className="opacity-40"
              />
              {/* Synapse points */}
              <circle cx="70" cy="80" r="3" fill="#8B5CF6" className="opacity-60" />
              <circle cx="130" cy="80" r="3" fill="#8B5CF6" className="opacity-60" />
              <circle cx="70" cy="100" r="3" fill="#8B5CF6" className="opacity-60" />
              <circle cx="130" cy="100" r="3" fill="#8B5CF6" className="opacity-60" />
              <circle cx="70" cy="120" r="3" fill="#8B5CF6" className="opacity-60" />
              <circle cx="130" cy="120" r="3" fill="#8B5CF6" className="opacity-60" />
              {/* Abstract thought patterns */}
              <path
                d="M60,70 Q100,20 140,70
                   M60,130 Q100,180 140,130"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                className="opacity-30"
              />
              {/* Central connection lines */}
              <path
                d="M100,40 L100,160"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="opacity-20"
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
