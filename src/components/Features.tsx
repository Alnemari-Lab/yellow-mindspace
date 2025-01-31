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
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 floating"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;