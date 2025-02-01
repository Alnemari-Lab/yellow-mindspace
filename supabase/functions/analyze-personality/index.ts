import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured in the environment');
    }

    const { personalityType, language } = await req.json();
    
    console.log('Analyzing personality type:', personalityType);
    console.log('Language:', language);

    if (!personalityType) {
      throw new Error('Personality type is required');
    }

    const systemPrompt = language === 'ar' 
      ? 'أنت مستشار مهني متخصص في تحليل الشخصية. قدم تحليلاً عميقاً ومفصلاً.'
      : 'You are a professional career counselor specializing in personality analysis. Provide a deep and detailed analysis.';

    const userPrompt = language === 'ar'
      ? `قم بتحليل نمط الشخصية ${personalityType} مع التركيز على:
         1. نقاط القوة والضعف الرئيسية
         2. أسلوب التعلم المفضل
         3. التحديات المحتملة في الدراسة الجامعية
         4. نصائح للنجاح الأكاديمي
         5. المهارات التي يجب تطويرها
         قدم إجابة مفصلة ومفيدة.`
      : `Analyze the ${personalityType} personality type focusing on:
         1. Key strengths and weaknesses
         2. Preferred learning style
         3. Potential challenges in university studies
         4. Tips for academic success
         5. Skills to develop
         Provide a detailed and helpful response.`;

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(JSON.stringify({ 
      analysis: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-personality function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});