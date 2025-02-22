import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

        // Fetch the user's MBTI result
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

        // Fetch personality type details
        const { data: detailsData, error: detailsError } = await supabase
          .from('mbti_type_details')
          .select('*')
          .eq('type_code', mbtiData.type_result)
          .maybeSingle();

        if (detailsError) throw detailsError;

        if (detailsData) {
          setTypeDetails(detailsData);
        }

        // Fetch development areas
        const { data: areasData, error: areasError } = await supabase
          .from('mbti_development_areas')
          .select('area_key, explanation_en, explanation_ar')
          .eq('type_code', mbtiData.type_result);

        if (areasError) throw areasError;

        if (areasData) {
          setDevelopmentAreas(areasData);
        }

        // Get AI Analysis
        const { data, error } = await supabase.functions.invoke('analyze-personality', {
          body: {
            personalityType: mbtiData.type_result,
            language
          },
        });

        if (error) throw error;
        setAnalysis(data.analysis);

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

  const areaLabels = {
    cultural: {
      en: "Cultural Development",
      ar: "تطوير الثقافة"
    },
    health: {
      en: "Health Care",
      ar: "الاهتمام بالصحة"
    },
    relationships: {
      en: "Relationship Development",
      ar: "تطوير العلاقات"
    },
    financial: {
      en: "Financial Growth",
      ar: "النمو المالي"
    },
    faith: {
      en: "Faith Strengthening",
      ar: "تقوية الإيمان"
    }
  };

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
            <div className="text-center bg-white/50 rounded-lg p-8 shadow-sm">
              <h2 className="text-4xl font-bold text-orange-800 mb-2">
                {language === 'en' ? 'Personality Type' : 'نوع الشخصية'}
              </h2>
              <p className="text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 text-transparent bg-clip-text">
                {personalityType}
              </p>
            </div>
          )}

          {typeDetails && (
            <>
              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'AI Personality Analysis' : 'تحليل الشخصية بالذكاء الاصطناعي'}
                </h3>
                <div className="prose prose-orange max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {analysis}
                  </p>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'Development Areas' : 'مجالات التطوير'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {developmentAreas.map((area) => (
                    <div key={area.area_key} className="bg-white/50 p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-semibold text-orange-800 mb-2">
                        {areaLabels[area.area_key]?.[language]}
                      </h4>
                      <p className="text-gray-700">
                        {language === 'en' ? area.explanation_en : area.explanation_ar}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'Key Strengths' : 'نقاط القوة الرئيسية'}
                </h3>
                <div className="text-lg leading-relaxed text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Strong analytical and problem-solving abilities</li>
                        <li>Natural leadership qualities</li>
                        <li>Excellent communication skills</li>
                        <li>Creative thinking and innovation</li>
                      </>
                    ) : (
                      <>
                        <li>قدرات تحليلية وحل المشكلات قوية</li>
                        <li>صفات قيادية طبيعية</li>
                        <li>مهارات تواصل ممتازة</li>
                        <li>التفكير الإبداعي والابتكار</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'Areas to Improve' : 'مجالات للتحسين'}
                </h3>
                <div className="text-lg leading-relaxed text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Time management and organization</li>
                        <li>Emotional intelligence and empathy</li>
                        <li>Stress management</li>
                        <li>Active listening skills</li>
                      </>
                    ) : (
                      <>
                        <li>إدارة الوقت والتنظيم</li>
                        <li>الذكاء العاطفي والتعاطف</li>
                        <li>إدارة التوتر</li>
                        <li>مهارات الاستماع النشط</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'Personal Development Tips' : 'نصائح للتطوير الشخصي'}
                </h3>
                <div className="text-lg leading-relaxed text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Practice mindfulness and self-reflection daily</li>
                        <li>Set clear goals and create action plans</li>
                        <li>Seek feedback from peers and mentors</li>
                        <li>Engage in continuous learning</li>
                      </>
                    ) : (
                      <>
                        <li>ممارسة اليقظة الذهنية والتأمل الذاتي يومياً</li>
                        <li>وضع أهداف واضحة وإنشاء خطط عمل</li>
                        <li>طلب التغذية الراجعة من الزملاء والموجهين</li>
                        <li>المشاركة في التعلم المستمر</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-800 mb-6">
                  {language === 'en' ? 'Social Interaction Style' : 'نمط التفاعل الاجتماعي'}
                </h3>
                <div className="text-lg leading-relaxed text-gray-700">
                  <p className="mb-4">
                    {language === 'en' 
                      ? `As a ${personalityType}, your social interaction style is characterized by:`
                      : `كشخصية من نوع ${personalityType}، يتميز أسلوب تفاعلك الاجتماعي بـ:`
                    }
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    {language === 'en' ? (
                      <>
                        <li>Preference for meaningful one-on-one conversations</li>
                        <li>Strong ability to read social cues</li>
                        <li>Natural networking abilities</li>
                        <li>Diplomatic communication style</li>
                      </>
                    ) : (
                      <>
                        <li>تفضيل المحادثات الهادفة وجهاً لوجه</li>
                        <li>قدرة قوية على قراءة الإشارات الاجتماعية</li>
                        <li>قدرات طبيعية في التواصل الشبكي</li>
                        <li>أسلوب تواصل دبلوماسي</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
