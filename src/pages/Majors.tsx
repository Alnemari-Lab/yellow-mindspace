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
    type_code: string;
    description_en: string;
    description_ar: string;
    recommended_majors_en: string[];
    recommended_majors_ar: string[];
  } | null>(null);
  const [personalityType, setPersonalityType] = useState<string | null>(null);

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

        setPersonalityType(mbtiData.type_result);

        // Fetch type details with recommended majors
        const { data: typeDetailsData, error: typeDetailsError } = await supabase
          .from('mbti_type_details')
          .select('type_code, description_en, description_ar, recommended_majors_en, recommended_majors_ar')
          .eq('type_code', mbtiData.type_result)
          .maybeSingle();

        if (typeDetailsError) {
          console.error("Type details fetch error:", typeDetailsError);
          throw typeDetailsError;
        }

        if (typeDetailsData) {
          console.log("Found type details:", typeDetailsData);
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

          {/* Title with Personality Type */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-orange-800">
              {language === 'en' ? 'Your Personality Type' : 'نمط شخصيتك'}
            </h1>
            <p className="text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 text-transparent bg-clip-text">
              {personalityType}
            </p>
            <p className="text-xl text-orange-700">
              {typeDetails && (language === 'en' ? typeDetails.description_en : typeDetails.description_ar)}
            </p>
          </div>

          {/* Recommended Majors Section */}
          <div className="bg-white/70 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">
              {language === 'en' ? 'Recommended Majors' : 'التخصصات الموصى بها'}
            </h2>
            
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

          {/* Description Section */}
          <div className="bg-white/60 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">
              {language === 'en' 
                ? 'Why These Majors?' 
                : 'لماذا هذه التخصصات؟'}
            </h3>
            <p className="text-lg text-gray-700 text-center">
              {language === 'en'
                ? `These majors are recommended based on your ${personalityType} personality type. They align with your natural strengths and preferences, offering paths where you're most likely to excel and find fulfillment.`
                : `هذه التخصصات موصى بها بناءً على نمط شخصيتك ${personalityType}. وهي تتوافق مع نقاط قوتك وتفضيلاتك الطبيعية، وتقدم مسارات حيث من المرجح أن تتفوق وتجد الرضا.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Majors;