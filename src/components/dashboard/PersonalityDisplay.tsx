import { useNavigate } from 'react-router-dom';

interface PersonalityDisplayProps {
  result: {
    type_result: string;
  } | null;
  typeDetails: {
    description_en: string;
    description_ar: string;
    recommended_majors_en: string[];
    recommended_majors_ar: string[];
  } | null;
  aiAnalysis: string | null;
  language: 'en' | 'ar';
  translations: {
    personality: string;
    recommendedMajors: string;
    noResults: string;
    personalityTraits: string;
  };
}

export const PersonalityDisplay = ({
  result,
  typeDetails,
  aiAnalysis,
  language,
  translations,
}: PersonalityDisplayProps) => {
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="text-center p-8 bg-white/50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-600">{translations.noResults}</p>
      </div>
    );
  }

  const handleAnalysisClick = () => {
    navigate('/analysis');
  };

  return (
    <div className="space-y-8">
      {/* Personality Type Header */}
      <div className="text-center bg-white/50 rounded-lg p-8 shadow-sm transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-4xl font-bold text-orange-800 mb-2">{translations.personality}</h2>
        <p className="text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 text-transparent bg-clip-text">
          {result.type_result}
        </p>
      </div>

      {typeDetails && (
        <>
          {/* AI Analysis Section - Now Clickable */}
          {aiAnalysis && (
            <div 
              onClick={handleAnalysisClick}
              className="bg-white/70 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-orange-800 mb-6">
                {language === 'en' ? 'AI Personality Analysis' : 'تحليل الشخصية بالذكاء الاصطناعي'}
              </h3>
              <div className="prose prose-orange max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                  {aiAnalysis}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white/60 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {translations.personalityTraits}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
            </p>
          </div>

          <div className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {language === 'en' ? 'Key Strengths' : 'نقاط القوة الرئيسية'}
            </h3>
            <div className="grid gap-4">
              <div className="text-lg leading-relaxed text-gray-700">
                {language === 'en' ? (
                  <>
                    <p className="mb-4">As a {result.type_result} personality type, your key strengths include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Strong analytical and problem-solving abilities</li>
                      <li>Natural leadership qualities</li>
                      <li>Excellent communication skills</li>
                      <li>Creative thinking and innovation</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="mb-4">كشخصية من نوع {result.type_result}، تتضمن نقاط قوتك الرئيسية:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>قدرات تحليلية وحل المشكلات قوية</li>
                      <li>صفات قيادية طبيعية</li>
                      <li>مهارات تواصل ممتازة</li>
                      <li>التفكير الإبداعي والابتكار</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {language === 'en' ? 'Areas for Growth' : 'مجالات التطور'}
            </h3>
            <div className="text-lg leading-relaxed text-gray-700">
              {language === 'en' ? (
                <>
                  <p className="mb-4">Consider working on these areas to reach your full potential:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Developing emotional intelligence</li>
                    <li>Improving work-life balance</li>
                    <li>Practicing active listening</li>
                    <li>Building patience and flexibility</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">فكر في العمل على هذه المجالات للوصول إلى كامل إمكاناتك:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>تطوير الذكاء العاطفي</li>
                    <li>تحسين التوازن بين العمل والحياة</li>
                    <li>ممارسة الاستماع النشط</li>
                    <li>بناء الصبر والمرونة</li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {language === 'en' ? 'Career Paths & Major Preferences' : 'المسارات المهنية والتخصصات المفضلة'}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              {language === 'en' 
                ? `Based on your ${result.type_result} personality type, you might excel in the following fields:`
                : `بناءً على نمط شخصيتك ${result.type_result}، قد تتفوق في المجالات التالية:`
              }
            </p>
            <div className="space-y-2">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <p key={`text-${index}`} className="text-lg text-orange-800">
                  • {major}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {language === 'en' ? 'Personal Development Tips' : 'نصائح للتطور الشخصي'}
            </h3>
            <div className="text-lg leading-relaxed text-gray-700">
              {language === 'en' ? (
                <>
                  <p className="mb-4">To maximize your potential, consider these development strategies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Join leadership development programs</li>
                    <li>Practice mindfulness and self-reflection</li>
                    <li>Seek mentorship opportunities</li>
                    <li>Engage in continuous learning</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">لتحقيق أقصى إمكاناتك، ضع في اعتبارك هذه الاستراتيجيات التطويرية:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>الانضمام إلى برامج تطوير القيادة</li>
                    <li>ممارسة اليقظة الذهنية والتأمل الذاتي</li>
                    <li>البحث عن فرص التوجيه</li>
                    <li>المشاركة في التعلم المستمر</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
