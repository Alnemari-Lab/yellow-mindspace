import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Majors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [typeDetails, setTypeDetails] = useState<{
    recommended_majors_en: string[];
    recommended_majors_ar: string[];
  } | null>(null);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          toast({
            title: language === 'en' ? "Error" : "خطأ",
            description: language === 'en' 
              ? "Please log in to view majors" 
              : "يرجى تسجيل الدخول لعرض التخصصات",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        // Fetch user's MBTI result
        const { data: mbtiData, error: mbtiError } = await supabase
          .from('mbti_results')
          .select('type_result')
          .eq('user_id', user.id)
          .maybeSingle();

        if (mbtiError) {
          console.error("MBTI results fetch error:", mbtiError);
          throw mbtiError;
        }

        if (!mbtiData) {
          toast({
            title: language === 'en' ? "No Results" : "لا توجد نتائج",
            description: language === 'en' 
              ? "Please take the MBTI test first" 
              : "يرجى إجراء اختبار MBTI أولاً",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        // Fetch type details
        const { data: typeDetailsData, error: typeDetailsError } = await supabase
          .from('mbti_type_details')
          .select('recommended_majors_en, recommended_majors_ar')
          .eq('type_code', mbtiData.type_result)
          .maybeSingle();

        if (typeDetailsError) {
          console.error("Type details fetch error:", typeDetailsError);
          throw typeDetailsError;
        }

        if (typeDetailsData) {
          setTypeDetails(typeDetailsData);
        }

      } catch (error) {
        console.error('Error fetching majors:', error);
        toast({
          title: language === 'en' ? "Error" : "خطأ",
          description: language === 'en' 
            ? "Failed to load majors" 
            : "فشل في تحميل التخصصات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMajors();
  }, [navigate, toast, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">
          {language === 'en' ? 'Loading...' : 'جار التحميل...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {language === 'en' ? 'Back to Dashboard' : 'العودة إلى لوحة المعلومات'}
          </Button>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">
            {language === 'en' ? 'Recommended Majors' : 'التخصصات الموصى بها'}
          </h1>

          {/* Majors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typeDetails && (language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
              <div
                key={index}
                className="bg-white/40 backdrop-blur-md p-6 rounded-xl 
                         shadow-lg hover:shadow-2xl transition-all duration-300 
                         hover:scale-105 hover:bg-white/60 
                         border border-white/50 group cursor-pointer
                         animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <p className="text-orange-900 text-xl font-bold text-center group-hover:text-orange-700 transition-colors">
                  {major}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Majors;