
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

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

    const areaPrompts = {
      cultural: {
        en: "Provide specific advice for cultural development and learning",
        ar: "كيف تطور ثقافتك"
      },
      health: {
        en: "Provide specific advice for health improvement and wellness",
        ar: "كيف تهتم بصحتك"
      },
      relationships: {
        en: "Provide specific advice for developing better relationships",
        ar: "كيف تطور علاقاتك"
      },
      financial: {
        en: "Provide specific advice for financial growth and management",
        ar: "كيف تنمي مالك"
      },
      faith: {
        en: "Provide specific advice for strengthening faith and spiritual growth",
        ar: "كيف تقوي إيمانك"
      }
    };

    const prompt = language === 'ar' ? areaPrompts[area].ar : areaPrompts[area].en;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a personality development expert specializing in MBTI personality types. 
            Your task is to provide specific, actionable advice for a ${personalityType} personality type.
            Keep responses concise (2-3 sentences) and personalized to their personality type.
            ${language === 'ar' ? 'Respond in Arabic.' : 'Respond in English.'}`
          },
          {
            role: 'user',
            content: `Based on the ${personalityType} personality type, ${prompt}`
          }
        ],
      }),
    });

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-development-areas function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
