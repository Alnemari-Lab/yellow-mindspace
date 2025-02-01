import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResponseButtonsProps {
  onResponse: (response: boolean) => void;
  isSubmitting: boolean;
}

export const ResponseButtons = ({ onResponse, isSubmitting }: ResponseButtonsProps) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      agree: "Agree",
      disagree: "Disagree",
    },
    ar: {
      agree: "موافق",
      disagree: "غير موافق",
    }
  };

  const t = translations[language];

  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={() => onResponse(true)}
        disabled={isSubmitting}
        className="w-32 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
      >
        {t.agree}
      </Button>
      <Button
        onClick={() => onResponse(false)}
        disabled={isSubmitting}
        className="w-32 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
      >
        {t.disagree}
      </Button>
    </div>
  );
};