
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { QuestionDisplay } from "./mbti/QuestionDisplay";
import { TestProgress } from "./mbti/TestProgress";
import { useMBTITest } from "@/hooks/useMBTITest";

interface Question {
  id: number;
  question_text: string;
  question_text_ar: string;
  dimension: string;
}

const MBTITest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    en: {
      loading: "Loading questions...",
      error: "Error loading questions",
    },
    ar: {
      loading: "جاري تحميل الأسئلة...",
      error: "خطأ في تحميل الأسئلة",
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('mbti_questions')
          .select('*')
          .order('id');

        if (error) throw error;
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast({
          title: "Error",
          description: t.error,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [t.error, toast]);

  const { currentQuestionIndex, isSubmitting, handleResponse, currentQuestion } = useMBTITest(questions);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">{t.loading}</div>;
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <TestProgress current={currentQuestionIndex} total={questions.length} />
        <QuestionDisplay 
          questionText={currentQuestion.question_text} 
          questionTextAr={currentQuestion.question_text_ar} 
          questionNumber={currentQuestionIndex + 1}
          onResponse={handleResponse}
        />
      </Card>
    </div>
  );
};

export default MBTITest;
