
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personalityType, area, language } = await req.json();
    console.log('Generating analysis for:', { personalityType, area, language });

    // Predefined responses based on personality types and areas
    const responses = {
      cultural: {
        en: {
          INTJ: "Focus on systematic learning through structured online courses and documentaries. Create a knowledge acquisition plan.",
          INTP: "Explore philosophical texts and academic research. Join online discussion groups for intellectual discourse.",
          ENTJ: "Lead cultural initiatives and organize learning groups. Focus on strategic cultural exploration.",
          ENTP: "Engage in diverse cultural activities. Challenge traditional perspectives through creative exploration.",
          DEFAULT: "Engage in cultural activities that align with your interests. Set specific learning goals."
        },
        ar: {
          INTJ: "ركز على التعلم المنهجي من خلال الدورات عبر الإنترنت والأفلام الوثائقية. قم بإنشاء خطة لاكتساب المعرفة.",
          INTP: "استكشف النصوص الفلسفية والبحث الأكاديمي. انضم إلى مجموعات النقاش عبر الإنترنت للخطاب الفكري.",
          ENTJ: "قيادة المبادرات الثقافية وتنظيم مجموعات التعلم. التركيز على الاستكشاف الثقافي الاستراتيجي.",
          ENTP: "المشاركة في الأنشطة الثقافية المتنوعة. تحدي وجهات النظر التقليدية من خلال الاستكشاف الإبداعي.",
          DEFAULT: "شارك في الأنشطة الثقافية التي تتوافق مع اهتماماتك. حدد أهداف تعلم محددة."
        }
      },
      health: {
        en: {
          INTJ: "Create a data-driven fitness plan. Track your progress using health apps and metrics.",
          INTP: "Research evidence-based health practices. Design experiments to optimize your wellness routine.",
          ENTJ: "Develop a comprehensive health strategy. Set and achieve measurable fitness goals.",
          ENTP: "Explore innovative health approaches. Mix different exercise styles to maintain interest.",
          DEFAULT: "Develop a consistent exercise routine and maintain a balanced diet."
        },
        ar: {
          INTJ: "قم بإنشاء خطة لياقة بدنية قائمة على البيانات. تتبع تقدمك باستخدام تطبيقات وقياسات الصحة.",
          INTP: "ابحث في ممارسات الصحة المستندة إلى الأدلة. صمم تجارب لتحسين روتين العافية الخاص بك.",
          ENTJ: "تطوير استراتيجية صحية شاملة. وضع وتحقيق أهداف اللياقة البدنية القابلة للقياس.",
          ENTP: "استكشف مناهج صحية مبتكرة. مزج أنماط مختلفة من التمارين للحفاظ على الاهتمام.",
          DEFAULT: "طور روتين تمارين منتظم وحافظ على نظام غذائي متوازن."
        }
      },
      relationships: {
        en: {
          INTJ: "Schedule regular check-ins with important connections. Practice active listening techniques.",
          INTP: "Analyze relationship patterns and work on emotional intelligence. Join group activities.",
          ENTJ: "Build strategic networks and mentor others. Focus on developing leadership relationships.",
          ENTP: "Foster diverse social connections. Use creativity to strengthen relationships.",
          DEFAULT: "Invest time in meaningful connections. Practice empathy and active communication."
        },
        ar: {
          INTJ: "جدول مواعيد منتظمة للتواصل مع العلاقات المهمة. مارس تقنيات الاستماع النشط.",
          INTP: "حلل أنماط العلاقات واعمل على الذكاء العاطفي. انضم إلى الأنشطة الجماعية.",
          ENTJ: "بناء شبكات استراتيجية وتوجيه الآخرين. التركيز على تطوير علاقات القيادة.",
          ENTP: "تعزيز الروابط الاجتماعية المتنوعة. استخدام الإبداع لتقوية العلاقات.",
          DEFAULT: "استثمر وقتك في العلاقات الهادفة. مارس التعاطف والتواصل النشط."
        }
      },
      financial: {
        en: {
          INTJ: "Develop a detailed long-term financial strategy. Research investment opportunities systematically.",
          INTP: "Analyze market trends and economic theories. Create multiple income stream hypotheses.",
          ENTJ: "Execute ambitious financial plans. Focus on wealth building and business development.",
          ENTP: "Explore innovative financial opportunities. Develop creative solutions for wealth growth.",
          DEFAULT: "Create a budget and set clear financial goals. Track expenses regularly."
        },
        ar: {
          INTJ: "طور استراتيجية مالية مفصلة طويلة المدى. ابحث عن فرص الاستثمار بشكل منهجي.",
          INTP: "حلل اتجاهات السوق والنظريات الاقتصادية. أنشئ فرضيات لمصادر دخل متعددة.",
          ENTJ: "تنفيذ خطط مالية طموحة. التركيز على بناء الثروة وتطوير الأعمال.",
          ENTP: "استكشف الفرص المالية المبتكرة. تطوير حلول إبداعية لنمو الثروة.",
          DEFAULT: "أنشئ ميزانية وحدد أهدافًا مالية واضحة. تتبع النفقات بانتظام."
        }
      },
      faith: {
        en: {
          INTJ: "Study religious texts analytically. Create a structured spiritual development plan.",
          INTP: "Explore theological concepts deeply. Engage in philosophical discussions about faith.",
          ENTJ: "Lead religious study groups. Organize faith-based community initiatives.",
          ENTP: "Question and explore different aspects of faith. Engage in interfaith dialogue.",
          DEFAULT: "Develop a consistent spiritual practice. Seek knowledge and understanding."
        },
        ar: {
          INTJ: "ادرس النصوص الدينية بشكل تحليلي. أنشئ خطة منظمة للتطور الروحي.",
          INTP: "استكشف المفاهيم اللاهوتية بعمق. شارك في المناقشات الفلسفية حول الإيمان.",
          ENTJ: "قيادة مجموعات الدراسة الدينية. تنظيم مبادرات مجتمعية قائمة على الإيمان.",
          ENTP: "اطرح الأسئلة واستكشف جوانب مختلفة من الإيمان. شارك في حوار الأديان.",
          DEFAULT: "طور ممارسة روحية متسقة. ابحث عن المعرفة والفهم."
        }
      }
    };

    // Get the appropriate response based on personality type and area
    const areaResponses = responses[area]?.[language] ?? {};
    const analysis = areaResponses[personalityType] ?? areaResponses.DEFAULT;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-development-areas function:', error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate analysis",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

