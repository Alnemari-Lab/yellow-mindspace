
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const generatePrompt = (personalityType: string, area: string, language: string) => {
  const basePrompt = language === 'en' 
    ? `As an MBTI expert, provide personalized advice for an ${personalityType} personality type on how to develop in the ${area} area. Focus on their strengths and potential challenges. Keep it concise (2-3 sentences) and actionable.`
    : `كخبير في MBTI، قدم نصيحة شخصية لشخصية ${personalityType} حول كيفية التطور في مجال ${area}. ركز على نقاط القوة والتحديات المحتملة. اجعلها موجزة (2-3 جمل) وقابلة للتنفيذ.`;

  return basePrompt;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personalityType, areas, language } = await req.json();
    
    console.log('Generating analysis for:', { personalityType, areas, language });
    
    const areaPromises = areas.map(async (area: string) => {
      const prompt = generatePrompt(personalityType, area, language);
      
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
              content: language === 'en'
                ? 'You are an MBTI expert providing concise, personalized development advice.'
                : 'أنت خبير في MBTI تقدم نصائح تطوير شخصية موجزة.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 150
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return [area, data.choices[0].message.content];
    });

    const results = await Promise.all(areaPromises);
    const analyses = Object.fromEntries(results);

    return new Response(JSON.stringify(analyses), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-development-areas function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate analysis',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
