import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { PersonalityDisplay } from "@/components/dashboard/PersonalityDisplay";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profile, setProfile] = useState<{ full_name: string | null; face_image_url: string | null; } | null>(null);
  const [result, setResult] = useState<{ type_result: string } | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [typeDetails, setTypeDetails] = useState<{
    description_en: string;
    description_ar: string;
    recommended_majors_en: string[];
    recommended_majors_ar: string[];
  } | null>(null);

  // Translations
  const translations = {
    welcome: language === 'en' ? 'Welcome back' : 'مرحباً بعودتك',
    getAIAnalysis: language === 'en' ? 'Get AI Analysis' : 'الحصول على تحليل الذكاء الاصطناعي',
    analyzing: language === 'en' ? 'Analyzing...' : 'جاري التحليل...',
    retakeTest: language === 'en' ? 'Retake Test' : 'إعادة الاختبار',
    backToHome: language === 'en' ? 'Back to Home' : 'العودة للرئيسية',
    personality: language === 'en' ? 'Your Personality Type' : 'نوع شخصيتك',
    recommendedMajors: language === 'en' ? 'Recommended Majors' : 'التخصصات الموصى بها',
    noResults: language === 'en' 
      ? 'No personality test results found. Take the test to see your results!' 
      : 'لم يتم العثور على نتائج اختبار الشخصية. قم بإجراء الاختبار لرؤية نتائجك!',
    personalityTraits: language === 'en' ? 'Personality Traits' : 'سمات الشخصية',
    error: {
      loading: language === 'en' ? 'Error loading dashboard data' : 'خطأ في تحميل بيانات لوحة المعلومات',
      auth: language === 'en' ? 'Please log in to access the dashboard' : 'يرجى تسجيل الدخول للوصول إلى لوحة المعلومات',
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          toast({
            title: "Error",
            description: translations.error.auth,
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        console.log("Fetching data for user:", user.id);

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, face_image_url')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        if (profileData) {
          console.log("Profile data found:", profileData);
          setProfile(profileData);
        } else {
          console.log("No profile data found for user");
        }

        // Fetch MBTI results
        const { data: mbtiData, error: mbtiError } = await supabase
          .from('mbti_results')
          .select('type_result')
          .eq('user_id', user.id)
          .maybeSingle();

        if (mbtiError) {
          console.error("MBTI results fetch error:", mbtiError);
          throw mbtiError;
        }

        if (mbtiData) {
          console.log("MBTI result found:", mbtiData);
          setResult(mbtiData);
          
          // Fetch type details if we have a result
          const { data: typeDetailsData, error: typeDetailsError } = await supabase
            .from('mbti_type_details')
            .select('description_en, description_ar, recommended_majors_en, recommended_majors_ar')
            .eq('type_code', mbtiData.type_result)
            .maybeSingle();

          if (typeDetailsError) {
            console.error("Type details fetch error:", typeDetailsError);
            throw typeDetailsError;
          }

          if (typeDetailsData) {
            console.log("Type details found:", typeDetailsData);
            setTypeDetails(typeDetailsData);
          } else {
            console.log("No type details found for type:", mbtiData.type_result);
          }
        } else {
          console.log("No MBTI results found for user");
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: translations.error.loading,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, toast, translations.error.auth, translations.error.loading]);

  const handleRetakeTest = () => {
    navigate('/mbti-test');
  };

  const handleGetAIAnalysis = async () => {
    if (!result?.type_result) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-personality', {
        body: {
          personalityType: result.type_result,
          language
        },
      });

      if (error) throw error;

      console.log('AI Analysis received:', data);
      setAiAnalysis(data.analysis);
      
      toast({
        title: language === 'en' ? "Analysis Complete" : "اكتمل التحليل",
        description: language === 'en' 
          ? "Your personality analysis is ready!"
          : "تحليل شخصيتك جاهز!",
      });

    } catch (error) {
      console.error('Error getting AI analysis:', error);
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en'
          ? "Failed to get AI analysis. Please try again."
          : "فشل في الحصول على التحليل. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-orange-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {translations.backToHome}
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader
            fullName={profile?.full_name}
            imageUrl={profile?.face_image_url}
            welcomeText={translations.welcome}
          />

          <ActionButtons
            onRetakeTest={handleRetakeTest}
            onGetAIAnalysis={handleGetAIAnalysis}
            isAnalyzing={isAnalyzing}
            getAiAnalysisText={translations.getAIAnalysis}
            analyzingText={translations.analyzing}
            retakeTestText={translations.retakeTest}
          />

          <PersonalityDisplay
            result={result}
            typeDetails={typeDetails}
            aiAnalysis={aiAnalysis}
            language={language}
            translations={{
              personality: translations.personality,
              recommendedMajors: translations.recommendedMajors,
              noResults: translations.noResults,
              personalityTraits: translations.personalityTraits,
            }}
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-4 bg-white/10 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            {language === 'en' 
              ? '© 2025 All rights reserved'
              : '© 2025 جميع الحقوق محفوظة'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;