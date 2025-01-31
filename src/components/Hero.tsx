import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen hero-gradient overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-100 abstract-shape opacity-50" />
      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 text-gray-900">
            Discover Your Perfect Major
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Use AI-powered analysis and face recognition to find the academic path that matches your unique potential.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/register")}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;