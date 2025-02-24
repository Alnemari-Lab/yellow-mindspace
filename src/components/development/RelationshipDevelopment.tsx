
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface RelationshipDevelopmentProps {
  personalityType: string;
}

const RelationshipDevelopment: React.FC<RelationshipDevelopmentProps> = ({ personalityType }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white/70 rounded-xl shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-2xl font-bold text-orange-800">
            {language === 'en' ? 'Relationship Development' : 'تطوير العلاقات'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Relationship Skills' : 'مهارات العلاقات'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {language === 'en' ? (
                <>
                  <li>Practice active listening and empathy</li>
                  <li>Develop clear communication habits</li>
                  <li>Build and maintain boundaries</li>
                  <li>Show appreciation and gratitude</li>
                </>
              ) : (
                <>
                  <li>ممارسة الاستماع النشط والتعاطف</li>
                  <li>تطوير عادات التواصل الواضح</li>
                  <li>بناء والحفاظ على الحدود</li>
                  <li>إظهار التقدير والامتنان</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">
              {language === 'en' ? 'Connection Strategy' : 'استراتيجية التواصل'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? `As a ${personalityType}, leverage your natural inclination for deep conversations while working on emotional expression and regular social engagement.`
                : `كشخصية ${personalityType}، استفد من ميلك الطبيعي للمحادثات العميقة مع العمل على التعبير العاطفي والمشاركة الاجتماعية المنتظمة.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipDevelopment;
