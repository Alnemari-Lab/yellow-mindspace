
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionDisplayProps {
  questionText: string;
  questionTextAr: string;
  questionNumber: number;
  onResponse: (response: boolean) => void;
}

export const QuestionDisplay = ({ 
  questionText, 
  questionTextAr, 
  questionNumber,
  onResponse 
}: QuestionDisplayProps) => {
  const { language } = useLanguage();
  const displayText = language === 'ar' ? questionTextAr : questionText;

  // Split the text into question and options
  const parts = displayText.split('\n\n');
  const mainQuestion = parts[0];
  const options = parts.slice(1, 3); // Get the two options

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-6">
          {questionNumber}.
          <br />
          {mainQuestion}
        </h2>
      </div>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-gray-200 hover:border-primary cursor-pointer transition-colors"
            onClick={() => onResponse(index === 0)}
          >
            <p className="text-lg">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
