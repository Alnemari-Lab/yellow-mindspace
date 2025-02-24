
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface FinancialDevelopmentProps {
  personalityType: string;
}

const FinancialDevelopment: React.FC<FinancialDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

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
              {language === 'en' ? (
                <>
                  <li>Create and maintain a budget</li>
                  <li>Set clear financial goals</li>
                  <li>Build emergency savings</li>
                  <li>Invest in your future</li>
                </>
              ) : (
                <>
                  <li>إنشاء والحفاظ على ميزانية</li>
                  <li>وضع أهداف مالية واضحة</li>
                  <li>بناء مدخرات للطوارئ</li>
                  <li>الاستثمار في مستقبلك</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Growth Strategy' : 'استراتيجية النمو'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? `As a ${personalityType}, use your analytical skills to research and implement sound financial strategies. Focus on long-term planning and systematic wealth building.`
                : `كشخصية ${personalityType}، استخدم مهاراتك التحليلية لبحث وتنفيذ استراتيجيات مالية سليمة. ركز على التخطيط طويل المدى وبناء الثروة المنهجي.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialDevelopment;
