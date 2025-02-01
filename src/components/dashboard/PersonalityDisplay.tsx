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
  console.log('PersonalityDisplay - Result:', result);
  console.log('PersonalityDisplay - Type Details:', typeDetails);
  
  if (!result) {
    return (
      <div className="text-center space-y-4">
        <p>{translations.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-gray-600 mb-2">{translations.personality}</p>
        <h2 className="text-4xl font-bold text-secondary mb-4">{result.type_result}</h2>
      </div>

      {typeDetails && (
        <>
          <div className="bg-white/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{translations.personalityTraits}</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
            </p>
          </div>

          <div className="bg-white/50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{translations.recommendedMajors}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-700 text-lg font-medium">{major}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-8 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-2xl font-bold text-orange-800 mb-6">{translations.recommendedMajors}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <div 
                  key={`additional-${index}`}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-lg shadow-md 
                           hover:shadow-xl transition-all duration-300 hover:scale-105 
                           hover:from-orange-200 hover:to-yellow-200 
                           border border-orange-200"
                >
                  <p className="text-orange-900 text-lg font-semibold">{major}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};