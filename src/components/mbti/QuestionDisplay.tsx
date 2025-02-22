
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionDisplayProps {
  questionText: string;
  questionTextAr: string;
  questionNumber: number;
}

export const QuestionDisplay = ({ 
  questionText, 
  questionTextAr, 
  questionNumber 
}: QuestionDisplayProps) => {
  const { language } = useLanguage();
  const displayText = language === 'ar' ? questionTextAr : questionText;

  // Split the question text into the main question and options
  const [mainQuestion, ...options] = displayText.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-left">
        {questionNumber}.
        <br />
        {mainQuestion}
      </h2>
      <div className="space-y-4 mt-4">
        {options.map((option, index) => (
          <p key={index} className="text-lg text-left pl-4">
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};
