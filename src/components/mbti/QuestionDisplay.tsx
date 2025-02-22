
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">
          {questionNumber}.
        </h2>
        <p className="text-lg">{mainQuestion}</p>
      </div>
      <div className="space-y-4 max-w-xl mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onResponse(index === 0)}
            className="w-full p-6 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            <p className="text-lg">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
