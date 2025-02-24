
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface FaithDevelopmentProps {
  personalityType: string;
}

const FaithDevelopment: React.FC<FaithDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white/70 rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-2xl font-bold text-orange-800">
            {language === 'en' ? 'Faith Development' : 'تطوير الإيمان'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Spiritual Practices' : 'الممارسات الروحية'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {language === 'en' ? (
                <>
                  <li>Regular prayer and meditation</li>
                  <li>Study religious texts and teachings</li>
                  <li>Participate in community worship</li>
                  <li>Practice gratitude and mindfulness</li>
                </>
              ) : (
                <>
                  <li>الصلاة والتأمل بانتظام</li>
                  <li>دراسة النصوص والتعاليم الدينية</li>
                  <li>المشاركة في العبادة الجماعية</li>
                  <li>ممارسة الامتنان واليقظة</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Spiritual Growth Strategy' : 'استراتيجية النمو الروحي'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? `As a ${personalityType}, combine your analytical nature with spiritual practices. Focus on understanding deeper meanings while maintaining regular devotional practices.`
                : `كشخصية ${personalityType}، ادمج طبيعتك التحليلية مع الممارسات الروحية. ركز على فهم المعاني العميقة مع الحفاظ على ممارسات تعبدية منتظمة.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaithDevelopment;
