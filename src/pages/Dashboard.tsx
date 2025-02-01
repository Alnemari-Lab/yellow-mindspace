import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wand2, RefreshCw } from "lucide-react";

interface Profile {
  full_name: string;
  face_image_url: string | null;
}

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

        // Fetch profile data using maybeSingle() instead of single()
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

        // Fetch MBTI results
        const { data: resultData, error: resultError } = await supabase
          .from('mbti_results')
          .select('*')
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

          // Fetch type details
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
  }, [navigate, t.noResults, toast]);

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
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.face_image_url || ''} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">{t.welcome}</p>
              <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGetAIAnalysis} disabled={isAnalyzing}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isAnalyzing ? t.analyzing : t.getAiAnalysis}
            </Button>
            <Button onClick={handleRetakeTest} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t.retakeTest}
            </Button>
          </div>
        </div>
        
        {result ? (
          <>
            <div className="text-center">
              <p className="text-gray-600 mb-2">{t.personality}</p>
              <h2 className="text-4xl font-bold text-secondary mb-8">{result.type_result}</h2>
            </div>

            {typeDetails && (
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {language === 'en' ? typeDetails.description_en : typeDetails.description_ar}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">{t.recommendedMajors}</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {(language === 'en' ? typeDetails.recommended_majors_en : typeDetails.recommended_majors_ar).map((major, index) => (
                      <li key={index} className="text-lg">{major}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-4">
            <p>{t.noResults}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
