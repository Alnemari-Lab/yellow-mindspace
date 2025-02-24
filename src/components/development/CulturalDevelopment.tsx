
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface CulturalDevelopmentProps {
  personalityType: string;
}

const CulturalDevelopment: React.FC<CulturalDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white/70 rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-2xl font-bold text-orange-800">
            {language === 'en' ? 'Cultural Development' : 'التطور الثقافي'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Key Activities' : 'الأنشطة الرئيسية'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {language === 'en' ? (
                <>
                  <li>Read diverse literature and explore different cultures</li>
                  <li>Attend cultural events and exhibitions</li>
                  <li>Learn new languages and their cultural contexts</li>
                  <li>Engage with people from different backgrounds</li>
                </>
              ) : (
                <>
                  <li>قراءة الأدب المتنوع واستكشاف الثقافات المختلفة</li>
                  <li>حضور الفعاليات الثقافية والمعارض</li>
                  <li>تعلم لغات جديدة وسياقاتها الثقافية</li>
                  <li>التفاعل مع أشخاص من خلفيات مختلفة</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Development Strategy' : 'استراتيجية التطوير'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? `As a ${personalityType}, focus on systematic cultural exploration that aligns with your analytical nature. Create a structured plan for cultural learning and engagement.`
                : `كشخصية ${personalityType}، ركز على الاستكشاف الثقافي المنهجي الذي يتوافق مع طبيعتك التحليلية. قم بإنشاء خطة منظمة للتعلم والمشاركة الثقافية.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalDevelopment;
