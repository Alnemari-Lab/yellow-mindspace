import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Discover Your",
      titleSpan: "Perfect Major",
      subtitle:
        "Using advanced analysis to help you find the academic path that best matches your unique abilities and interests.",
      cta: "Get Started",
    },
    ar: {
      title: "اكتشف",
      titleSpan: "تخصصك المثالي",
      subtitle:
        "باستخدام التحليل المتقدم لمساعدتك في العثور على المسار الأكاديمي الذي يتناسب بشكل أفضل مع قدراتك واهتماماتك الفريدة.",
      cta: "ابدأ الآن",
    },
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff5d6]">
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-3xl mx-auto text-center relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="w-40 h-40 mx-auto mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Left hemisphere */}
              <path
                d="M95,20 C120,20 140,35 145,65 C150,95 140,120 125,140 C110,160 90,165 70,155 C50,145 40,120 45,90 C50,60 70,20 95,20"
                fill="#F97316"
                className="opacity-90"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M95,20 C120,20 140,35 145,65 C150,95 140,120 125,140 C110,160 90,165 70,155 C50,145 40,120 45,90 C50,60 70,20 95,20;
                    M95,20 C125,20 145,40 148,70 C151,100 138,125 120,142 C105,158 85,162 65,150 C45,138 38,115 42,85 C46,55 65,20 95,20;
                    M95,20 C120,20 140,35 145,65 C150,95 140,120 125,140 C110,160 90,165 70,155 C50,145 40,120 45,90 C50,60 70,20 95,20"
                  />
              </path>
              {/* Right hemisphere */}
              <path
                d="M105,20 C130,20 150,35 155,65 C160,95 150,120 135,140 C120,160 100,165 80,155 C60,145 50,120 55,90 C60,60 80,20 105,20"
                fill="#F97316"
                className="opacity-80"
                transform="scale(-1,1) translate(-200,0)"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M105,20 C130,20 150,35 155,65 C160,95 150,120 135,140 C120,160 100,165 80,155 C60,145 50,120 55,90 C60,60 80,20 105,20;
                    M105,20 C135,20 155,40 158,70 C161,100 148,125 130,142 C115,158 95,162 75,150 C55,138 48,115 52,85 C56,55 75,20 105,20;
                    M105,20 C130,20 150,35 155,65 C160,95 150,120 135,140 C120,160 100,165 80,155 C60,145 50,120 55,90 C60,60 80,20 105,20"
                  />
              </path>
              {/* Brain folds - left */}
              <path
                d="M75,40 Q85,60 75,80 Q65,100 75,120 Q85,140 75,160"
                stroke="#F97316"
                strokeWidth="2"
                fill="none"
                className="opacity-60"
              >
                <animate
                  attributeName="d"
                  dur="12s"
                  repeatCount="indefinite"
                  values="
                    M75,40 Q85,60 75,80 Q65,100 75,120 Q85,140 75,160;
                    M73,40 Q88,62 73,82 Q63,102 73,122 Q88,142 73,162;
                    M75,40 Q85,60 75,80 Q65,100 75,120 Q85,140 75,160"
                  />
              </path>
              {/* Brain folds - right */}
              <path
                d="M125,40 Q135,60 125,80 Q115,100 125,120 Q135,140 125,160"
                stroke="#F97316"
                strokeWidth="2"
                fill="none"
                className="opacity-60"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M125,40 Q135,60 125,80 Q115,100 125,120 Q135,140 125,160;
                    M123,40 Q138,62 123,82 Q113,102 123,122 Q138,142 123,162;
                    M125,40 Q135,60 125,80 Q115,100 125,120 Q135,140 125,160"
                  />
              </path>
            </svg>
          </div>
          <h1 className="text-7xl font-bold mb-6 text-gray-900 tracking-tight">
            {currentContent.title}
            <span className="block text-secondary mt-2">{currentContent.titleSpan}</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            {currentContent.subtitle}
          </p>
          <a
            href="/register"
            className="inline-block bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {currentContent.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;