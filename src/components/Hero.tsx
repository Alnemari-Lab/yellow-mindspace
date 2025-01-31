import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Discover Your",
      titleSpan: "Perfect Major",
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
    <div className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="abstract-circle w-96 h-96 bg-yellow-200 -top-20 -left-20"></div>
        <div className="abstract-circle w-72 h-72 bg-orange-200 bottom-20 right-20"></div>
        <div className="abstract-circle w-64 h-64 bg-amber-200 top-40 right-40"></div>
      </div>
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-3xl relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <h1 className="text-6xl font-bold mb-6 text-white">
            {currentContent.title}
            <span className="block text-yellow-100 mt-2">{currentContent.titleSpan}</span>
          </h1>
          <p className="text-xl mb-8 text-yellow-50">
            {currentContent.description}
          </p>
          <div className={`space-x-4 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
            <Button
              onClick={() => navigate("/register")}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg"
            >
              {currentContent.getStarted}
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg"
            >
              {currentContent.login}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;