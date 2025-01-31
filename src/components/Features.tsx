import { Lightbulb, Brain, GraduationCap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Lightbulb className="w-12 h-12 text-secondary" />,
      title: "Smart Analysis",
      description: "AI-powered assessment of your interests and strengths"
    },
    {
      icon: <Brain className="w-12 h-12 text-secondary" />,
      title: "Personalized Recommendations",
      description: "Get major suggestions tailored to your unique profile"
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-secondary" />,
      title: "Future Planning",
      description: "Explore career paths and university options"
    }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all duration-300 floating"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
              <div className="mb-4 flex justify-center relative z-10">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;