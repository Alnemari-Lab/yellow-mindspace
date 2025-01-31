import { Lightbulb, Brain, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { language } = useLanguage();

  const features = {
    en: [
      {
        icon: <Lightbulb className="w-12 h-12 text-secondary" />,
        title: "Smart Analysis",
        description: "AI-powered assessment of your interests and strengths"
      },
      {
        icon: <Brain className="w-12 h-12 text-secondary" />,
        title: "Personalized Recommendations",
        description: "Get major suggestions tailored to your unique profile"
      },
      {
        icon: <GraduationCap className="w-12 h-12 text-secondary" />,
        title: "Future Planning",
        description: "Explore career paths and university options"
      }
    ],
    ar: [
      {
        icon: <Lightbulb className="w-12 h-12 text-secondary" />,
        title: "تحليل ذكي",
        description: "تقييم مدعوم بالذكاء الاصطناعي لاهتماماتك ونقاط قوتك"
      },
      {
        icon: <Brain className="w-12 h-12 text-secondary" />,
        title: "توصيات مخصصة",
        description: "احصل على اقتراحات تخصص مصممة خصيصًا لملفك الشخصي"
      },
      {
        icon: <GraduationCap className="w-12 h-12 text-secondary" />,
        title: "تخطيط المستقبل",
        description: "استكشف المسارات المهنية وخيارات الجامعات"
      }
    ]
  };

  const currentFeatures = features[language];

  return (
    <div className="py-24 bg-gradient-to-b from-[#fff9e6] to-white relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {currentFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;