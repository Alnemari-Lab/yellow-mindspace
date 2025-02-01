import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

console.log("Personality Analysis Function Started");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
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

${typeDetails.description_en}

Recommended Career Paths:
${typeDetails.recommended_majors_en.map(major => `• ${major}`).join('\n')}

This analysis is based on your MBTI personality type and our database of career recommendations. Use this information as a starting point for exploring potential career paths that align with your natural strengths and preferences.`
      : `بناءً على نمط شخصيتك ${personalityType}:

${typeDetails.description_ar}

المسارات المهنية الموصى بها:
${typeDetails.recommended_majors_ar.map(major => `• ${major}`).join('\n')}

يستند هذا التحليل إلى نوع شخصيتك MBTI وقاعدة بياناتنا للتوصيات المهنية. استخدم هذه المعلومات كنقطة انطلاق لاستكشاف المسارات المهنية المحتملة التي تتوافق مع نقاط قوتك وتفضيلاتك الطبيعية.`;

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