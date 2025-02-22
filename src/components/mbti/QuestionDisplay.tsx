
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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {questionNumber}.
          <br />
          {mainQuestion}
        </h2>
      </div>
      <div className="space-y-6 mt-8">
        {options.map((option, index) => (
          <p key={index} className="text-lg">
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};
