import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

console.log("Personality Analysis Function Started");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch personality type details from the database
    const { data: typeDetails, error } = await supabase
      .from('mbti_type_details')
      .select('*')
      .eq('type_code', personalityType)
      .single();

    if (error) {
      console.error('Error fetching type details:', error);
      throw new Error('Failed to fetch personality type details');
    }

    if (!typeDetails) {
      console.log('No type details found for:', personalityType);
      return new Response(
        JSON.stringify({
          analysis: language === 'en' 
            ? "Personality type analysis not available."
            : "تحليل نوع الشخصية غير متوفر."
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Generate analysis based on database content
    const analysis = language === 'en'
      ? `Based on your ${personalityType} personality type:

Overview:
${typeDetails.description_en}

Recommended Career Paths:
${typeDetails.recommended_majors_en.map(major => `• ${major}`).join('\n')}

This comprehensive analysis is based on established MBTI research and can help guide your academic and career choices. Remember that while these insights are generally accurate for your personality type, individual variations are normal and expected. Use this analysis as a starting point for self-reflection and personal development.`
      : `بناءً على نمط شخصيتك ${personalityType}:

نظرة عامة:
${typeDetails.description_ar}

المسارات المهنية الموصى بها:
${typeDetails.recommended_majors_ar.map(major => `• ${major}`).join('\n')}

يستند هذا التحليل الشامل إلى أبحاث MBTI المعتمدة ويمكن أن يساعد في توجيه خياراتك الأكاديمية والمهنية. تذكر أنه في حين أن هذه الرؤى دقيقة عموماً لنمط شخصيتك، فإن الاختلافات الفردية طبيعية ومتوقعة. استخدم هذا التحليل كنقطة انطلاق للتأمل الذاتي والتطور الشخصي.`;

    console.log('Analysis generated successfully');

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error in personality analysis:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        analysis: 'Failed to generate personality analysis.'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});