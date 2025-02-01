import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionDisplayProps {
  questionText: string;
  questionTextAr: string;
}

export const QuestionDisplay = ({ questionText, questionTextAr }: QuestionDisplayProps) => {
  const { language } = useLanguage();
  const displayText = language === 'ar' ? questionTextAr : questionText;

  return (
    <h2 className="text-xl text-center font-semibold">
      {displayText}
    </h2>
  );
};