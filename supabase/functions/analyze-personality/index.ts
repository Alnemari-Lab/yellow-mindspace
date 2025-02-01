import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log("Personality Analysis Function Started");

const personalityAnalysis = {
  // Analysts
  'INTJ': {
    en: {
      strengths: [
        "Strategic thinking",
        "Independent problem-solving",
        "Strong analytical skills",
        "Innovation and creativity"
      ],
      careers: [
        "Scientific research",
        "Systems architecture",
        "Strategic planning",
        "Academic pursuits"
      ],
      development: [
        "Practice emotional intelligence",
        "Improve communication skills",
        "Develop team collaboration",
        "Balance analysis with action"
      ]
    },
    ar: {
      strengths: [
        "التفكير الاستراتيجي",
        "حل المشكلات بشكل مستقل",
        "مهارات تحليلية قوية",
        "الابتكار والإبداع"
      ],
      careers: [
        "البحث العلمي",
        "هندسة النظم",
        "التخطيط الاستراتيجي",
        "المجالات الأكاديمية"
      ],
      development: [
        "ممارسة الذكاء العاطفي",
        "تحسين مهارات التواصل",
        "تطوير التعاون الجماعي",
        "الموازنة بين التحليل والعمل"
      ]
    }
  },
  'INTP': {
    en: {
      strengths: [
        "Logical analysis",
        "Conceptual problem-solving",
        "Innovation in theories",
        "Abstract thinking"
      ],
      careers: [
        "Software development",
        "Research and development",
        "Data analysis",
        "Philosophy and mathematics"
      ],
      development: [
        "Develop practical applications",
        "Improve social skills",
        "Work on project completion",
        "Balance theory with practice"
      ]
    },
    ar: {
      strengths: [
        "التحليل المنطقي",
        "حل المشكلات المفاهيمية",
        "الابتكار في النظريات",
        "التفكير المجرد"
      ],
      careers: [
        "تطوير البرمجيات",
        "البحث والتطوير",
        "تحليل البيانات",
        "الفلسفة والرياضيات"
      ],
      development: [
        "تطوير التطبيقات العملية",
        "تحسين المهارات الاجتماعية",
        "العمل على إكمال المشاريع",
        "الموازنة بين النظرية والتطبيق"
      ]
    }
  },
  // Diplomats
  'INFJ': {
    en: {
      strengths: [
        "Deep understanding of others",
        "Creative problem-solving",
        "Strong written communication",
        "Long-term planning"
      ],
      careers: [
        "Counseling and therapy",
        "Writing and journalism",
        "Human resources",
        "Social work"
      ],
      development: [
        "Set realistic boundaries",
        "Practice self-care",
        "Express needs directly",
        "Balance helping others with personal needs"
      ]
    },
    ar: {
      strengths: [
        "فهم عميق للآخرين",
        "حل المشكلات بإبداع",
        "مهارات كتابية قوية",
        "التخطيط طويل المدى"
      ],
      careers: [
        "الإرشاد والعلاج النفسي",
        "الكتابة والصحافة",
        "الموارد البشرية",
        "العمل الاجتماعي"
      ],
      development: [
        "وضع حدود واقعية",
        "ممارسة العناية بالنفس",
        "التعبير عن الاحتياجات بشكل مباشر",
        "الموازنة بين مساعدة الآخرين والاحتياجات الشخصية"
      ]
    }
  },
  // Add more personality types...
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

Key Strengths:
${data.strengths.map(s => `• ${s}`).join('\n')}

Recommended Career Paths:
${data.careers.map(c => `• ${c}`).join('\n')}

Areas for Personal Development:
${data.development.map(d => `• ${d}`).join('\n')}

This analysis is based on established personality type research and can help guide your academic and career choices. Remember that this is a general guide, and individual variations within each type are normal and expected.`
    : `بناءً على نمط شخصيتك ${type}:

نقاط القوة الرئيسية:
${data.strengths.map(s => `• ${s}`).join('\n')}

المسارات المهنية الموصى بها:
${data.careers.map(c => `• ${c}`).join('\n')}

مجالات التطور الشخصي:
${data.development.map(d => `• ${d}`).join('\n')}

يستند هذا التحليل إلى أبحاث معتمدة في أنماط الشخصية ويمكن أن يساعد في توجيه خياراتك الأكاديمية والمهنية. تذكر أن هذا دليل عام، والاختلافات الفردية داخل كل نمط طبيعية ومتوقعة.`;
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