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
    <>
      <div className="text-center">
        <p className="text-gray-600 mb-2">{translations.personality}</p>
        <h2 className="text-4xl font-bold text-secondary mb-8">{result.type_result}</h2>
      </div>

      {typeDetails && (
        <div className="space-y-6">
          <div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{translations.recommendedMajors}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                <li key={index} className="text-lg">{major}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};