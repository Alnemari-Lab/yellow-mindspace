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
              {/* Main abstract shape */}
              <path
                d="M100,20 
                   C150,20 180,50 170,100 
                   C160,150 130,170 100,170 
                   C70,170 40,150 30,100 
                   C20,50 50,20 100,20"
                fill="#F97316"
                className="opacity-80"
              />
              {/* Abstract neural connections - left */}
              <path
                d="M60,60 Q80,90 60,120 Q90,100 60,60"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                className="opacity-60"
              />
              {/* Abstract neural connections - right */}
              <path
                d="M140,60 Q120,90 140,120 Q110,100 140,60"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                className="opacity-60"
              />
              {/* Central abstract divide */}
              <path
                d="M100,30 Q110,100 100,170 M100,30 Q90,100 100,170"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                className="opacity-70"
              />
              {/* Abstract synapses */}
              <circle cx="70" cy="80" r="4" fill="#F97316" className="opacity-60" />
              <circle cx="130" cy="80" r="4" fill="#F97316" className="opacity-60" />
              <circle cx="85" cy="120" r="4" fill="#F97316" className="opacity-60" />
              <circle cx="115" cy="120" r="4" fill="#F97316" className="opacity-60" />
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