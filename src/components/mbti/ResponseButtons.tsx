
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResponseButtonsProps {
  onResponse: (response: boolean) => void;
  isSubmitting: boolean;
}

export const ResponseButtons = ({ onResponse, isSubmitting }: ResponseButtonsProps) => {
  return null; // We're not using this component anymore as the responses are handled in QuestionDisplay
};
