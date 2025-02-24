
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
              {/* Main circular network */}
              <circle 
                cx="100" 
                cy="100" 
                r="70" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="1" 
                className="opacity-20" 
              />
              
              {/* Neural network nodes */}
              <circle cx="100" cy="50" r="4" fill="#F97316" className="opacity-70" />
              <circle cx="150" cy="100" r="4" fill="#F97316" className="opacity-70" />
              <circle cx="100" cy="150" r="4" fill="#F97316" className="opacity-70" />
              <circle cx="50" cy="100" r="4" fill="#F97316" className="opacity-70" />
              <circle cx="100" cy="100" r="6" fill="#F97316" className="opacity-90" />

              {/* Connection lines */}
              <path
                d="M100,50 Q130,75 150,100
                   M150,100 Q130,125 100,150
                   M100,150 Q70,125 50,100
                   M50,100 Q70,75 100,50"
                fill="none"
                stroke="#F97316"
                strokeWidth="1.5"
                className="opacity-40"
              />

              {/* Inner connections */}
              <path
                d="M100,50 L100,100
                   M150,100 L100,100
                   M100,150 L100,100
                   M50,100 L100,100"
                fill="none"
                stroke="#F97316"
                strokeWidth="1"
                className="opacity-30"
              />

              {/* Decorative pulses */}
              <circle 
                cx="100" 
                cy="100" 
                r="40" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="0.5" 
                className="opacity-20" 
              />
              <circle 
                cx="100" 
                cy="100" 
                r="55" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="0.5" 
                className="opacity-15" 
              />

              {/* Dynamic connection points */}
              <circle cx="115" cy="75" r="2" fill="#F97316" className="opacity-60" />
              <circle cx="125" cy="125" r="2" fill="#F97316" className="opacity-60" />
              <circle cx="75" cy="125" r="2" fill="#F97316" className="opacity-60" />
              <circle cx="85" cy="75" r="2" fill="#F97316" className="opacity-60" />
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
