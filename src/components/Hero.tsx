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
              {/* Artistic flowing background shape */}
              <path
                d="M100,20 
                   C160,20 190,60 180,100 
                   C170,140 130,180 100,180 
                   C70,180 30,140 20,100 
                   C10,60 40,20 100,20"
                fill="#F97316"
                className="opacity-70"
              />
              {/* Abstract neural pathways */}
              <path
                d="M50,70 
                   Q80,90 60,120 
                   Q40,150 70,160 
                   Q100,170 130,160 
                   Q160,150 140,120 
                   Q120,90 150,70"
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                className="opacity-50"
              />
              {/* Artistic swirls */}
              <path
                d="M80,40 
                   Q100,60 90,80 
                   Q80,100 90,120 
                   Q100,140 120,120 
                   Q140,100 130,80 
                   Q120,60 140,40"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                className="opacity-60"
              />
              {/* Abstract neurons */}
              <circle cx="70" cy="60" r="3" fill="#F97316" className="opacity-80" />
              <circle cx="130" cy="60" r="3" fill="#F97316" className="opacity-80" />
              <circle cx="60" cy="100" r="2" fill="#F97316" className="opacity-70" />
              <circle cx="140" cy="100" r="2" fill="#F97316" className="opacity-70" />
              <circle cx="80" cy="140" r="3" fill="#F97316" className="opacity-80" />
              <circle cx="120" cy="140" r="3" fill="#F97316" className="opacity-80" />
              {/* Decorative elements */}
              <path
                d="M90,30 Q100,50 110,30"
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                className="opacity-40"
              />
              <path
                d="M80,170 Q100,150 120,170"
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                className="opacity-40"
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