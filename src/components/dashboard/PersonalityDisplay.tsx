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

          <div 
            onClick={handleAnalysisClick}
            className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {translations.personalityTraits}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
            </p>
          </div>

          <div 
            onClick={handleAnalysisClick}
            className="bg-white/70 rounded-xl p-8 shadow-md transform transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
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
        </>
      )}
    </div>
  );
};