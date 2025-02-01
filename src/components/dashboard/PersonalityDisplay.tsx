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
            <ul className="list-disc list-inside space-y-2">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <li key={index} className="text-gray-700 text-lg">{major}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};