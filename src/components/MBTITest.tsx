
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { QuestionDisplay } from "./mbti/QuestionDisplay";
import { TestProgress } from "./mbti/TestProgress";
import { useMBTITest } from "@/hooks/useMBTITest";
import { questions } from "@/data/mbtiQuestions";

const MBTITest = () => {
  const { language } = useLanguage();

  const { currentQuestionIndex, isSubmitting, handleResponse, currentQuestion } = useMBTITest(questions);

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <TestProgress current={currentQuestionIndex} total={questions.length} />
        <QuestionDisplay 
          text={currentQuestion.text}
          options={currentQuestion.options}
          questionNumber={currentQuestionIndex + 1}
          onResponse={handleResponse}
        />
      </Card>
    </div>
  );
};

export default MBTITest;
