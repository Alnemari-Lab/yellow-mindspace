import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface MBTIResult {
  type_result: string;
  e_score: number;
  i_score: number;
  s_score: number;
  n_score: number;
  t_score: number;
  f_score: number;
  j_score: number;
  p_score: number;
}

interface TypeDetails {
  description_en: string;
  description_ar: string;
  recommended_majors_en: string[];
  recommended_majors_ar: string[];
}

const Dashboard = () => {
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [typeDetails, setTypeDetails] = useState<TypeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Your MBTI Results",
      loading: "Loading your results...",
      noResults: "No results available. Redirecting to MBTI test...",
      personality: "Your personality type is:",
      scores: "Detailed Scores",
      description: "Type Description",
      recommendedMajors: "Recommended Majors",
      retakeTest: "Retake Test",
    },
    ar: {
      title: "نتائج MBTI الخاصة بك",
      loading: "جاري تحميل النتائج...",
      noResults: "لا توجد نتائج متاحة. جاري التوجيه إلى اختبار MBTI...",
      personality: "نوع شخصيتك هو:",
      scores: "النتائج التفصيلية",
      description: "وصف الشخصية",
      recommendedMajors: "التخصصات الموصى بها",
      retakeTest: "إعادة الاختبار",
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
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        // Changed from .single() to .maybeSingle() to handle multiple or no results
        const { data: resultData, error: resultError } = await supabase
          .from('mbti_results')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (resultError) {
          console.error('Error fetching results:', resultError);
          toast({
            title: "Error",
            description: "Failed to fetch your results",
            variant: "destructive",
          });
          return;
        }

        if (!resultData) {
          toast({
            title: "No Results Found",
            description: t.noResults,
          });
          setTimeout(() => {
            navigate('/mbti-test');
          }, 2000);
          return;
        }

        setResult(resultData);

        // Fetch type details
        const { data: typeData, error: typeError } = await supabase
          .from('mbti_type_details')
          .select('*')
          .eq('type_code', resultData.type_result)
          .maybeSingle();

        if (typeError) {
          console.error('Error fetching type details:', typeError);
          return;
        }

        setTypeDetails(typeData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    fetchResults();
  }, [navigate, t.noResults, toast]);

  const handleRetakeTest = () => {
    navigate('/mbti-test');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Card className="p-6">
          <p>{t.loading}</p>
        </Card>
      </div>
    );
  }

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
      <Card className="w-full max-w-4xl p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <Button onClick={handleRetakeTest} variant="outline">
            {t.retakeTest}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-2">{t.personality}</p>
          <h2 className="text-4xl font-bold text-secondary">{result.type_result}</h2>
        </div>

        {typeDetails && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">{t.description}</h3>
              <p className="text-gray-700">
                {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t.recommendedMajors}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                  <li key={index}>{major}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-4">{t.scores}</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">E: {result.e_score}</TableCell>
                <TableCell className="font-medium">I: {result.i_score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">S: {result.s_score}</TableCell>
                <TableCell className="font-medium">N: {result.n_score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">T: {result.t_score}</TableCell>
                <TableCell className="font-medium">F: {result.f_score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">J: {result.j_score}</TableCell>
                <TableCell className="font-medium">P: {result.p_score}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;