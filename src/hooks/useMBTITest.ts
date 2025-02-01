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
    if (isSubmitting) return;

    const currentQuestion = questions[currentQuestionIndex];
    console.log('Handling response for question:', currentQuestion.id, 'Response:', response);
    
    setResponses(prev => ({ ...prev, [currentQuestion.id]: response }));
    setIsSubmitting(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('User authentication error:', userError);
        throw new Error("User not authenticated");
      }

      console.log('Authenticated user:', user.id);

      // Call the stored procedure to handle the response
      const { error: responseError } = await supabase.rpc('handle_mbti_response', {
        p_user_id: user.id,
        p_question_id: currentQuestion.id,
        p_response: response
      });

      if (responseError) {
        console.error('Error saving response:', responseError);
        throw responseError;
      }

      // If this was the last question, calculate and save results
      if (currentQuestionIndex === questions.length - 1) {
        console.log('Last question answered, calculating results');
        const result = calculateMBTIType(responses);

        const { error: resultError } = await supabase
          .from('mbti_results')
          .upsert({
            user_id: user.id,
            type_result: result.type,
            ...result.scores
          }, {
            onConflict: 'mbti_results_user_id_key'
          });

        if (resultError) {
          console.error('Error saving results:', resultError);
          throw resultError;
        }

        navigate('/dashboard');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error in handleResponse:', error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
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