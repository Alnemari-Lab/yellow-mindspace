import { useLanguage } from "@/contexts/LanguageContext";

interface TestProgressProps {
  current: number;
  total: number;
}

export const TestProgress = ({ current, total }: TestProgressProps) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      progress: "Question",
      of: "of",
    },
    ar: {
      progress: "السؤال",
      of: "من",
    }
  };

  const t = translations[language];

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500">
        {t.progress} {current + 1} {t.of} {total}
      </p>
    </div>
  );
};