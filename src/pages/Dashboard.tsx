import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { PersonalityDisplay } from "@/components/dashboard/PersonalityDisplay";

interface Profile {
  full_name: string;
  face_image_url: string | null;
}

interface MBTIResult {
  type_result: string;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Your MBTI Results",
      loading: "Loading your results...",
      noResults: "No results available. Take the MBTI test to see your results!",
      personality: "Your personality type is:",
      recommendedMajors: "Recommended Majors for You",
      retakeTest: "Retake Test",
      welcome: "Welcome",
      getAiAnalysis: "Get AI Analysis",
      analyzing: "Analyzing your profile...",
    },
    ar: {
      title: "نتائج MBTI الخاصة بك",
      loading: "جاري تحميل النتائج...",
      noResults: "لا توجد نتائج متاحة. قم بإجراء اختبار MBTI لرؤية نتائجك!",
      personality: "نوع شخصيتك هو:",
      recommendedMajors: "التخصصات الموصى بها لك",
      retakeTest: "إعادة الاختبار",
      welcome: "مرحباً",
      getAiAnalysis: "تحليل بالذكاء الاصطناعي",
      analyzing: "جاري تحليل ملفك الشخصي...",
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
      return session;
    };

    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        setIsLoading(true);
        const session = await checkAuth();
        if (!session?.user) {
          console.log('No session found');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, face_image_url')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            title: "Error",
            description: "Failed to fetch profile data",
            variant: "destructive",
          });
          return;
        }

        if (profileData) {
          console.log('Profile found:', profileData);
          setProfile(profileData);
        } else {
          console.log('No profile found for user');
          toast({
            title: "Profile Not Found",
            description: "Unable to load profile information",
            variant: "destructive",
          });
        }

        const { data: resultData, error: resultError } = await supabase
          .from('mbti_results')
          .select('type_result')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (resultError) {
          console.error('Error fetching results:', resultError);
          toast({
            title: "Error",
            description: "Failed to fetch your results",
            variant: "destructive",
          });
          return;
        }

        if (!resultData || resultData.length === 0) {
          console.log('No results found');
          setResult(null);
        } else {
          console.log('Results found:', resultData[0]);
          setResult(resultData[0]);

          const { data: typeData, error: typeError } = await supabase
            .from('mbti_type_details')
            .select('*')
            .eq('type_code', resultData[0].type_result)
            .maybeSingle();

          if (typeError) {
            console.error('Error fetching type details:', typeError);
            return;
          }

          if (typeData) {
            console.log('Type details found:', typeData);
            setTypeDetails(typeData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  const handleRetakeTest = () => {
    navigate('/mbti-test');
  };

  const handleGetAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      toast({
        title: "Coming Soon",
        description: "AI analysis feature is coming soon!",
      });
    } catch (error) {
      console.error('AI Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-8">
        <div className="flex justify-between items-center">
          <ProfileHeader
            fullName={profile?.full_name}
            imageUrl={profile?.face_image_url}
            welcomeText={t.welcome}
          />
          <ActionButtons
            onRetakeTest={handleRetakeTest}
            onGetAIAnalysis={handleGetAIAnalysis}
            isAnalyzing={isAnalyzing}
            getAiAnalysisText={t.getAiAnalysis}
            analyzingText={t.analyzing}
            retakeTestText={t.retakeTest}
          />
        </div>
        
        <PersonalityDisplay
          result={result}
          typeDetails={typeDetails}
          language={language}
          translations={{
            personality: t.personality,
            recommendedMajors: t.recommendedMajors,
            noResults: t.noResults,
          }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;