import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

console.log("Personality Analysis Function Started");

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

    const systemPrompt = language === 'ar' 
      ? `أنت مستشار مهني متخصص في تحليل الشخصية. قم بتحليل نمط الشخصية ${personalityType} وقدم تحليلاً شاملاً يتضمن:
         1. نقاط القوة الرئيسية
         2. التحديات المحتملة
         3. نصائح للتطور الشخصي
         4. المجالات المهنية المناسبة
         5. المهارات التي يجب تطويرها
         قدم إجابة مفصلة ومفيدة.`
      : `You are a career counselor specializing in personality analysis. Analyze the ${personalityType} personality type and provide a comprehensive analysis including:
         1. Key strengths
         2. Potential challenges
         3. Personal development advice
         4. Suitable career fields
         5. Skills to develop
         Provide a detailed and helpful response.`;

    console.log('Making request to Ollama API...');
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `${systemPrompt}\n\nAnalyze ${personalityType} personality type`,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ollama API error:', errorData);
      throw new Error(`Ollama API error: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Ollama response received');

    if (!data.response) {
      throw new Error('Invalid response format from Ollama API');
    }

    return new Response(JSON.stringify({
      analysis: data.response
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