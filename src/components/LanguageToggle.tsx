import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="fixed top-4 right-4 z-50"
    >
      {language === 'en' ? 'عربي' : 'English'}
    </Button>
  );
};

export default LanguageToggle;