
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionDisplayProps {
  text: string;
  options: string[];
  questionNumber: number;
  onResponse: (response: boolean) => void;
}

export const QuestionDisplay = ({ 
  text,
  options,
  questionNumber,
  onResponse 
}: QuestionDisplayProps) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">
          {questionNumber}.
        </h2>
        <p className="text-lg">{text}</p>
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
