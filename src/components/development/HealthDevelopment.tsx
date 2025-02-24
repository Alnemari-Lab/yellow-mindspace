
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface HealthDevelopmentProps {
  personalityType: string;
}

const HealthDevelopment: React.FC<HealthDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white/70 rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-2xl font-bold text-orange-800">
            {language === 'en' ? 'Health Development' : 'التطور الصحي'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Health Practices' : 'الممارسات الصحية'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {language === 'en' ? (
                <>
                  <li>Maintain regular exercise routine</li>
                  <li>Practice mindful eating habits</li>
                  <li>Ensure adequate sleep and rest</li>
                  <li>Manage stress through healthy outlets</li>
                </>
              ) : (
                <>
                  <li>الحفاظ على روتين تمارين منتظم</li>
                  <li>ممارسة عادات الأكل الواعي</li>
                  <li>ضمان النوم والراحة الكافية</li>
                  <li>إدارة التوتر من خلال منافذ صحية</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Wellness Strategy' : 'استراتيجية العافية'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? `As a ${personalityType}, your analytical mindset can help you track and optimize your health metrics. Focus on creating sustainable, data-driven health routines.`
                : `كشخصية ${personalityType}، يمكن أن تساعدك عقليتك التحليلية في تتبع وتحسين مؤشراتك الصحية. ركز على إنشاء روتين صحي مستدام مبني على البيانات.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthDevelopment;
