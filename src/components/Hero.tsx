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
      <div className="wave-pattern"></div>
      <div className="wave-pattern-2"></div>
      
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-3xl mx-auto text-center relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <img 
            src="/lovable-uploads/86e84181-dd17-4c70-9995-ae29aa4a690d.png" 
            alt="Brain Icon" 
            className="w-24 h-24 mx-auto mb-8"
          />
          <h1 className="text-7xl font-bold mb-6 text-gray-900 tracking-tight">
            {currentContent.title}
            <span className="block text-secondary mt-2">{currentContent.titleSpan}</span>
          </h1>
          <p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>
          <div className={`space-x-4 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
            <Button
              onClick={() => navigate("/register")}
              className="btn-gradient text-white px-8 py-6 text-lg font-medium"
            >
              {currentContent.getStarted}
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="bg-white/80 hover:bg-white/90 text-gray-800 px-8 py-6 text-lg font-medium border-2 border-gray-200"
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