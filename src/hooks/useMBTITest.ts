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
    const scores = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    // Process all responses at once instead of iterating multiple times
    Object.entries(responses).forEach(([questionId, response]) => {
      const question = questions.find(q => q.id === Number(questionId));
      if (!question) return;

      const [positive, negative] = question.dimension.split('') as [keyof typeof scores, keyof typeof scores];
      response ? scores[positive]++ : scores[negative]++;
    });

    return {
      type: [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'J' : 'P'
      ].join(''),
      scores
    };
  };

  const handleResponse = async (response: boolean) => {
    if (isSubmitting) return;

    const currentQuestion = questions[currentQuestionIndex];
    setResponses(prev => ({ ...prev, [currentQuestion.id]: response }));

    // If not the last question, just update the index and continue
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    // Only proceed with submission for the last question
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");

      const updatedResponses = { ...responses, [currentQuestion.id]: response };
      const result = calculateMBTIType(updatedResponses);

      // Batch insert all responses
      const { error: responsesError } = await supabase
        .from('mbti_responses')
        .upsert(
          Object.entries(updatedResponses).map(([questionId, resp]) => ({
            user_id: user.id,
            question_id: parseInt(questionId),
            response: resp
          })),
          { onConflict: 'user_id,question_id' }
        );

      if (responsesError) throw responsesError;

      // Save final results
      const { error: resultError } = await supabase
        .from('mbti_results')
        .upsert({
          user_id: user.id,
          type_result: result.type,
          e_score: result.scores.E,
          i_score: result.scores.I,
          s_score: result.scores.S,
          n_score: result.scores.N,
          t_score: result.scores.T,
          f_score: result.scores.F,
          j_score: result.scores.J,
          p_score: result.scores.P
        }, {
          onConflict: 'user_id'
        });

      if (resultError) throw resultError;

      navigate('/dashboard');
    } catch (error) {
      console.error('Error in handleResponse:', error);
      toast({
        title: "Error",
        description: "Failed to save your responses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentQuestionIndex,
    isSubmitting,
    handleResponse,
    currentQuestion: questions[currentQuestionIndex]
  };
};