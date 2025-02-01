import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Question {
  id: number;
  question_text: string;
  question_text_ar: string;
  dimension: string;
}

const MBTITest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    en: {
      loading: "Loading questions...",
      error: "Error loading questions",
      agree: "Agree",
      disagree: "Disagree",
      submitting: "Submitting responses...",
      progress: "Question",
      of: "of",
    },
    ar: {
      loading: "جاري تحميل الأسئلة...",
      error: "خطأ في تحميل الأسئلة",
      agree: "موافق",
      disagree: "غير موافق",
      submitting: "جاري إرسال الإجابات...",
      progress: "السؤال",
      of: "من",
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

  const calculateMBTIType = (responses: Record<number, boolean>) => {
    let scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    questions.forEach((question) => {
      const response = responses[question.id];
      if (response === undefined) return;

      switch (question.dimension) {
        case 'EI':
          response ? scores.E++ : scores.I++;
          break;
        case 'SN':
          response ? scores.S++ : scores.N++;
          break;
        case 'TF':
          response ? scores.T++ : scores.F++;
          break;
        case 'JP':
          response ? scores.J++ : scores.P++;
          break;
      }
    });

    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.S > scores.N ? 'S' : 'N',
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('');

    return {
      type,
      scores: {
        e_score: scores.E,
        i_score: scores.I,
        s_score: scores.S,
        n_score: scores.N,
        t_score: scores.T,
        f_score: scores.F,
        j_score: scores.J,
        p_score: scores.P
      }
    };
  };

  const handleResponse = async (response: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    setResponses(prev => ({ ...prev, [currentQuestion.id]: response }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("User not authenticated");

        // First, delete any existing responses for this user and wait for it to complete
        const { error: deleteError } = await supabase
          .from('mbti_responses')
          .delete()
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;

        // After deletion is complete, insert new responses one by one
        for (const [questionId, responseValue] of Object.entries(responses)) {
          const { error: insertError } = await supabase
            .from('mbti_responses')
            .insert({
              user_id: user.id,
              question_id: parseInt(questionId),
              response: responseValue
            });
          
          if (insertError) throw insertError;
        }

        // Calculate and save results
        const result = calculateMBTIType(responses);

        // Delete any existing results for this user
        const { error: deleteResultError } = await supabase
          .from('mbti_results')
          .delete()
          .eq('user_id', user.id);

        if (deleteResultError) throw deleteResultError;

        // Save new results
        await supabase
          .from('mbti_results')
          .insert({
            user_id: user.id,
            type_result: result.type,
            ...result.scores
          });

        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving responses:', error);
        toast({
          title: "Error",
          description: "Failed to save your responses. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">{t.loading}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionText = language === 'ar' ? currentQuestion.question_text_ar : currentQuestion.question_text;

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {t.progress} {currentQuestionIndex + 1} {t.of} {questions.length}
          </p>
        </div>
        <h2 className="text-xl text-center font-semibold">
          {questionText}
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleResponse(true)}
            disabled={isSubmitting}
            className="w-32 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {t.agree}
          </Button>
          <Button
            onClick={() => handleResponse(false)}
            disabled={isSubmitting}
            className="w-32 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {t.disagree}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MBTITest;