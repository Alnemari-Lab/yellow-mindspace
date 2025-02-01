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
  language,
  translations,
}: PersonalityDisplayProps) => {
  if (!result) {
    return (
      <div className="text-center p-8 bg-white/50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-600">{translations.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Personality Type Header */}
      <div className="text-center bg-white/50 rounded-lg p-8 shadow-sm">
        <h2 className="text-4xl font-bold text-orange-800 mb-2">{translations.personality}</h2>
        <p className="text-5xl font-black text-orange-600">{result.type_result}</p>
      </div>

      {typeDetails && (
        <>
          {/* Personality Traits Section */}
          <div className="bg-white/60 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {translations.personalityTraits}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
            </p>
          </div>

          {/* Major Preferences Text Section */}
          <div className="bg-white/70 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {language === 'en' ? 'Major Preferences' : 'التخصصات المفضلة'}
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

          {/* First Recommended Majors Grid - Card Style */}
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {translations.recommendedMajors}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <div
                  key={index}
                  className="bg-white/90 p-6 rounded-lg shadow-md hover:shadow-xl 
                           transition-all duration-300 hover:scale-105 
                           border border-orange-200 hover:bg-gradient-to-r 
                           hover:from-orange-50 hover:to-yellow-50"
                >
                  <p className="text-orange-900 text-lg font-semibold">{major}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second Recommended Majors Display - Modern Gradient Style */}
          <div className="mt-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-8 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">
              {translations.recommendedMajors}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <div 
                  key={`alt-${index}`}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-lg 
                           shadow-md hover:shadow-xl transition-all duration-300 
                           hover:scale-105 hover:from-orange-200 hover:to-yellow-200 
                           border border-orange-200"
                >
                  <p className="text-orange-900 text-lg font-semibold">{major}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Third Recommended Majors Display - Modern Glass Style */}
          <div className="mt-8 bg-gradient-to-br from-orange-50/90 to-yellow-50/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-800 mb-8 text-center">
              {translations.recommendedMajors}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <div 
                  key={`glass-${index}`}
                  className="bg-white/40 backdrop-blur-md p-6 rounded-xl 
                           shadow-lg hover:shadow-2xl transition-all duration-300 
                           hover:scale-105 hover:bg-white/60 
                           border border-white/50"
                >
                  <p className="text-orange-900 text-xl font-bold text-center">{major}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};