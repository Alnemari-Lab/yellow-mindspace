
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CulturalDevelopment from "@/components/development/CulturalDevelopment";
import HealthDevelopment from "@/components/development/HealthDevelopment";
import RelationshipDevelopment from "@/components/development/RelationshipDevelopment";
import FinancialDevelopment from "@/components/development/FinancialDevelopment";
import FaithDevelopment from "@/components/development/FaithDevelopment";

interface TypeDetails {
  description_en: string;
  description_ar: string;
  recommended_majors_en: string[];
  recommended_majors_ar: string[];
}

interface DevelopmentArea {
  area_key: string;
  explanation_en: string;
  explanation_ar: string;
}

const Analysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [personalityType, setPersonalityType] = useState<string | null>(null);
  const [typeDetails, setTypeDetails] = useState<TypeDetails | null>(null);
  const [developmentAreas, setDevelopmentAreas] = useState<DevelopmentArea[]>([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: language === 'en' ? "Error" : "خطأ",
            description: language === 'en' 
              ? "Please log in to view analysis" 
              : "يرجى تسجيل الدخول لعرض التحليل",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        const { data: mbtiData, error: mbtiError } = await supabase
          .from('mbti_results')
          .select('type_result')
          .eq('user_id', user.id)
          .maybeSingle();

        if (mbtiError) throw mbtiError;
        
        if (!mbtiData) {
          toast({
            title: language === 'en' ? "Error" : "خطأ",
            description: language === 'en' 
              ? "Please take the MBTI test first" 
              : "يرجى إجراء اختبار MBTI أولاً",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        setPersonalityType(mbtiData.type_result);
        
        const [detailsResponse, areasResponse] = await Promise.all([
          supabase
            .from('mbti_type_details')
            .select('*')
            .eq('type_code', mbtiData.type_result)
            .maybeSingle(),
          supabase
            .from('mbti_development_areas')
            .select('area_key, explanation_en, explanation_ar')
            .eq('type_code', mbtiData.type_result)
        ]);

        if (detailsResponse.error) throw detailsResponse.error;
        if (areasResponse.error) throw areasResponse.error;

        if (detailsResponse.data) {
          setTypeDetails(detailsResponse.data);
        }

        if (areasResponse.data) {
          setDevelopmentAreas(areasResponse.data);
        }

      } catch (error) {
        console.error('Error fetching analysis:', error);
        toast({
          title: language === 'en' ? "Error" : "خطأ",
          description: language === 'en'
            ? "Failed to get analysis. Please try again."
            : "فشل في الحصول على التحليل. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [navigate, toast, language]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">
          {language === 'en' ? 'Analyzing...' : 'جاري التحليل...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={handleBack}
          variant="outline"
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Back to Dashboard' : 'العودة إلى لوحة المعلومات'}
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          {personalityType && (
            <>
              <div className="text-center bg-white/50 rounded-lg p-8 shadow-sm">
                <h2 className="text-4xl font-bold text-orange-800 mb-2">
                  {language === 'en' ? 'Personality Type' : 'نوع الشخصية'}
                </h2>
                <p className="text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 text-transparent bg-clip-text">
                  {personalityType}
                </p>
              </div>

              <div className="grid gap-8">
                <CulturalDevelopment personalityType={personalityType} />
                <HealthDevelopment personalityType={personalityType} />
                <RelationshipDevelopment personalityType={personalityType} />
                <FinancialDevelopment personalityType={personalityType} />
                <FaithDevelopment personalityType={personalityType} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
