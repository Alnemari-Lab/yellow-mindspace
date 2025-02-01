import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log("Personality Analysis Function Started");

const personalityAnalysis = {
  'INTJ': {
    en: {
      overview: "INTJs are strategic thinkers and architects of ideas, combining creativity with logic to develop innovative solutions.",
      strengths: [
        "Strategic planning and foresight",
        "Independent problem-solving",
        "Strong analytical abilities",
        "Innovative thinking",
        "Intellectual curiosity"
      ],
      careers: [
        "Scientific research",
        "Systems architecture",
        "Strategic planning",
        "Academic research",
        "Technology innovation"
      ],
      learning_style: [
        "Prefers independent study",
        "Enjoys theoretical concepts",
        "Learns through analysis and logic",
        "Values intellectual challenge"
      ],
      communication: [
        "Direct and concise",
        "Focuses on efficiency",
        "Values intellectual discourse",
        "Prefers written communication"
      ],
      challenges: [
        "May appear overly critical",
        "Can be perceived as distant",
        "Might struggle with emotional expression",
        "Sometimes overlooks practical details"
      ],
      growth_areas: [
        "Developing emotional intelligence",
        "Improving social interactions",
        "Balancing logic with empathy",
        "Practicing patience with others"
      ]
    },
    ar: {
      overview: "INTJ هم مفكرون استراتيجيون ومهندسو الأفكار، يجمعون بين الإبداع والمنطق لتطوير حلول مبتكرة.",
      strengths: [
        "التخطيط الاستراتيجي والبصيرة",
        "حل المشكلات بشكل مستقل",
        "قدرات تحليلية قوية",
        "التفكير المبتكر",
        "الفضول الفكري"
      ],
      careers: [
        "البحث العلمي",
        "هندسة النظم",
        "التخطيط الاستراتيجي",
        "البحث الأكاديمي",
        "ابتكار التكنولوجيا"
      ],
      learning_style: [
        "يفضل الدراسة المستقلة",
        "يستمتع بالمفاهيم النظرية",
        "يتعلم من خلال التحليل والمنطق",
        "يقدر التحدي الفكري"
      ],
      communication: [
        "مباشر وموجز",
        "يركز على الكفاءة",
        "يقدر الحوار الفكري",
        "يفضل التواصل الكتابي"
      ],
      challenges: [
        "قد يبدو شديد النقد",
        "يمكن أن يُنظر إليه على أنه بعيد",
        "قد يكافح مع التعبير العاطفي",
        "أحياناً يتجاهل التفاصيل العملية"
      ],
      growth_areas: [
        "تطوير الذكاء العاطفي",
        "تحسين التفاعلات الاجتماعية",
        "الموازنة بين المنطق والتعاطف",
        "ممارسة الصبر مع الآخرين"
      ]
    }
  },
  // Add similar detailed analysis for other types...
};

function generateAnalysis(type: string, language: 'en' | 'ar') {
  const typeData = personalityAnalysis[type as keyof typeof personalityAnalysis];
  if (!typeData) {
    return language === 'en' 
      ? "Personality type analysis not available."
      : "تحليل نوع الشخصية غير متوفر.";
  }

  const data = typeData[language];
  
  return language === 'en'
    ? `Based on your ${type} personality type:

Overview:
${data.overview}

Key Strengths:
${data.strengths.map(s => `• ${s}`).join('\n')}

Learning Style:
${data.learning_style.map(l => `• ${l}`).join('\n')}

Communication Style:
${data.communication.map(c => `• ${c}`).join('\n')}

Recommended Career Paths:
${data.careers.map(c => `• ${c}`).join('\n')}

Potential Challenges:
${data.challenges.map(c => `• ${c}`).join('\n')}

Areas for Personal Growth:
${data.growth_areas.map(g => `• ${g}`).join('\n')}

This comprehensive analysis is based on established MBTI research and can help guide your academic and career choices. Remember that while these insights are generally accurate for your personality type, individual variations are normal and expected. Use this analysis as a starting point for self-reflection and personal development.`
    : `بناءً على نمط شخصيتك ${type}:

نظرة عامة:
${data.overview}

نقاط القوة الرئيسية:
${data.strengths.map(s => `• ${s}`).join('\n')}

أسلوب التعلم:
${data.learning_style.map(l => `• ${l}`).join('\n')}

أسلوب التواصل:
${data.communication.map(c => `• ${c}`).join('\n')}

المسارات المهنية الموصى بها:
${data.careers.map(c => `• ${c}`).join('\n')}

التحديات المحتملة:
${data.challenges.map(c => `• ${c}`).join('\n')}

مجالات النمو الشخصي:
${data.growth_areas.map(g => `• ${g}`).join('\n')}

يستند هذا التحليل الشامل إلى أبحاث MBTI المعتمدة ويمكن أن يساعد في توجيه خياراتك الأكاديمية والمهنية. تذكر أنه في حين أن هذه الرؤى دقيقة عموماً لنمط شخصيتك، فإن الاختلافات الفردية طبيعية ومتوقعة. استخدم هذا التحليل كنقطة انطلاق للتأمل الذاتي والتطور الشخصي.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { personalityType, language } = await req.json();
    
    console.log('Analyzing personality type:', personalityType);
    console.log('Language:', language);

    if (!personalityType) {
      throw new Error('Personality type is required');
    }

    const analysis = generateAnalysis(personalityType, language);
    console.log('Analysis generated successfully');

    return new Response(JSON.stringify({
      analysis
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error in personality analysis:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});
