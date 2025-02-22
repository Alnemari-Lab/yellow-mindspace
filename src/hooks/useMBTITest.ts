
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  text: {
    en: string;
    ar: string;
  };
  options: {
    en: string[];
    ar: string[];
  };
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

    // Map questions to their corresponding dimensions
    const dimensionMap: Record<number, [keyof typeof scores, keyof typeof scores]> = {
      1: ['T', 'F'], 2: ['S', 'N'], 3: ['T', 'F'], 4: ['N', 'S'],
      5: ['P', 'J'], 6: ['F', 'T'], 7: ['N', 'S'], 8: ['I', 'E'],
      9: ['T', 'F'], 10: ['N', 'S'], 11: ['T', 'F'], 12: ['I', 'E'],
      13: ['S', 'N'], 14: ['T', 'F'], 15: ['I', 'E'], 16: ['F', 'T'],
      17: ['T', 'F'], 18: ['N', 'S'], 19: ['I', 'E'], 20: ['T', 'F'],
      21: ['N', 'S'], 22: ['E', 'I'], 23: ['I', 'E'], 24: ['J', 'P'],
      25: ['F', 'T'], 26: ['F', 'T'], 27: ['F', 'T'], 28: ['I', 'E'],
      29: ['N', 'S'], 30: ['T', 'F'], 31: ['P', 'J'], 32: ['T', 'F'],
      33: ['S', 'N'], 34: ['S', 'N'], 35: ['I', 'E'], 36: ['I', 'E']
    };

    Object.entries(responses).forEach(([questionId, response]) => {
      const dimension = dimensionMap[Number(questionId)];
      if (!dimension) return;

      const [positive, negative] = dimension;
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

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");

      const updatedResponses = { ...responses, [currentQuestion.id]: response };
      const result = calculateMBTIType(updatedResponses);

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
