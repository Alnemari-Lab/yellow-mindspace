import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  question_text: string;
  question_text_ar: string;
  dimension: string;
}

export const useMBTITest = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

    return {
      type: [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'J' : 'P'
      ].join(''),
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

        // Delete existing response for the current question
        const { error: deleteError } = await supabase
          .from('mbti_responses')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', currentQuestion.id);

        if (deleteError) throw deleteError;

        // Insert new response
        const { error: insertError } = await supabase
          .from('mbti_responses')
          .insert({
            user_id: user.id,
            question_id: currentQuestion.id,
            response
          });

        if (insertError) throw insertError;

        // Calculate and save results for the last question
        const result = calculateMBTIType(responses);

        // Delete existing results
        const { error: deleteResultError } = await supabase
          .from('mbti_results')
          .delete()
          .eq('user_id', user.id);

        if (deleteResultError) throw deleteResultError;

        // Save new results
        const { error: resultError } = await supabase
          .from('mbti_results')
          .insert({
            user_id: user.id,
            type_result: result.type,
            ...result.scores
          });

        if (resultError) throw resultError;

        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving response:', error);
        toast({
          title: "Error",
          description: "Failed to save your response. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    currentQuestionIndex,
    isSubmitting,
    handleResponse,
    currentQuestion: questions[currentQuestionIndex]
  };
};