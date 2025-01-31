import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Your MBTI Results",
      loading: "Loading your results...",
      noResults: "No results available. Please take the test first.",
      personality: "Your personality type is:",
      scores: "Detailed Scores",
    },
    ar: {
      title: "نتائج MBTI الخاصة بك",
      loading: "جاري تحميل النتائج...",
      noResults: "لا توجد نتائج متاحة. يرجى إجراء الاختبار أولاً.",
      personality: "نوع شخصيتك هو:",
      scores: "النتائج التفصيلية",
    }
  };

  const t = translations[language];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
    };

    const fetchResults = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('mbti_results')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching results:', error);
        return;
      }

      setResult(data);
    };

    checkAuth();
    fetchResults();
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Card className="p-6">
          <p>{t.noResults}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">{t.title}</h1>
        <div className="text-center">
          <p className="text-gray-600 mb-2">{t.personality}</p>
          <h2 className="text-4xl font-bold text-secondary">{result.type_result}</h2>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.scores}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span>E: {result.e_score}</span>
              <span>I: {result.i_score}</span>
            </div>
            <div className="flex justify-between">
              <span>S: {result.s_score}</span>
              <span>N: {result.n_score}</span>
            </div>
            <div className="flex justify-between">
              <span>T: {result.t_score}</span>
              <span>F: {result.f_score}</span>
            </div>
            <div className="flex justify-between">
              <span>J: {result.j_score}</span>
              <span>P: {result.p_score}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;