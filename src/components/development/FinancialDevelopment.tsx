
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface FinancialDevelopmentProps {
  personalityType: string;
}

const FinancialDevelopment: React.FC<FinancialDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

  const getPersonalitySpecificAdvice = (type: string, lang: 'en' | 'ar') => {
    const advice = {
      // Analysts (NT)
      'INTJ': {
        en: {
          practices: [
            'Create detailed long-term financial forecasts',
            'Research and analyze investment opportunities thoroughly',
            'Implement systematic budget tracking systems',
            'Focus on strategic wealth accumulation'
          ],
          strategy: 'As an INTJ, leverage your strategic thinking to create comprehensive financial plans. Your natural ability to see long-term patterns makes you well-suited for complex investment strategies.'
        },
        ar: {
          practices: [
            'إنشاء توقعات مالية مفصلة طويلة المدى',
            'البحث وتحليل فرص الاستثمار بدقة',
            'تنفيذ أنظمة منهجية لتتبع الميزانية',
            'التركيز على تراكم الثروة الاستراتيجي'
          ],
          strategy: 'كشخصية INTJ، استفد من تفكيرك الاستراتيجي لإنشاء خطط مالية شاملة. قدرتك الطبيعية على رؤية الأنماط طويلة المدى تجعلك مناسبًا لاستراتيجيات الاستثمار المعقدة.'
        }
      },
      'ENTJ': {
        en: {
          practices: [
            'Set ambitious financial goals and deadlines',
            'Lead and coordinate financial team efforts',
            'Develop multiple income streams',
            'Focus on efficiency and scalability'
          ],
          strategy: 'Your natural leadership abilities make you excellent at managing large-scale financial projects. Focus on building systems that can scale while maintaining efficiency.'
        },
        ar: {
          practices: [
            'وضع أهداف مالية طموحة ومواعيد نهائية',
            'قيادة وتنسيق جهود الفريق المالي',
            'تطوير مصادر دخل متعددة',
            'التركيز على الكفاءة وقابلية التوسع'
          ],
          strategy: 'قدراتك القيادية الطبيعية تجعلك ممتازًا في إدارة المشاريع المالية واسعة النطاق. ركز على بناء أنظمة قابلة للتوسع مع الحفاظ على الكفاءة.'
        }
      },
      // Guardians (SJ)
      'ISTJ': {
        en: {
          practices: [
            'Maintain meticulous financial records',
            'Follow traditional investment strategies',
            'Build stable emergency funds',
            'Focus on consistent savings habits'
          ],
          strategy: 'Your detail-oriented nature makes you excellent at tracking finances. Focus on building stable, long-term wealth through consistent and methodical approaches.'
        },
        ar: {
          practices: [
            'الاحتفاظ بسجلات مالية دقيقة',
            'اتباع استراتيجيات الاستثمار التقليدية',
            'بناء صناديق طوارئ مستقرة',
            'التركيز على عادات الادخار المنتظمة'
          ],
          strategy: 'طبيعتك المهتمة بالتفاصيل تجعلك ممتازًا في تتبع الأمور المالية. ركز على بناء ثروة مستقرة طويلة المدى من خلال نهج متسق ومنهجي.'
        }
      },
      // Default for other types
      'DEFAULT': {
        en: {
          practices: [
            'Create and maintain a budget',
            'Set clear financial goals',
            'Build emergency savings',
            'Invest in your future'
          ],
          strategy: `Use your unique personality strengths to develop a financial approach that works for you. Focus on consistency and gradual improvement.`
        },
        ar: {
          practices: [
            'إنشاء والحفاظ على ميزانية',
            'وضع أهداف مالية واضحة',
            'بناء مدخرات للطوارئ',
            'الاستثمار في مستقبلك'
          ],
          strategy: 'استخدم نقاط قوة شخصيتك الفريدة لتطوير نهج مالي يناسبك. ركز على الاتساق والتحسين التدريجي.'
        }
      }
    };

    // Get the specific advice for the personality type, or use default if not found
    const typeAdvice = advice[type as keyof typeof advice] || advice.DEFAULT;
    return lang === 'en' ? typeAdvice.en : typeAdvice.ar;
  };

  const personalizedAdvice = getPersonalitySpecificAdvice(personalityType, language);

  return (
    <Card className="bg-white/70 rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-2xl font-bold text-orange-800">
            {language === 'en' ? 'Financial Development' : 'التطور المالي'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Financial Practices' : 'الممارسات المالية'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {personalizedAdvice.practices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Growth Strategy' : 'استراتيجية النمو'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {personalizedAdvice.strategy}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialDevelopment;
