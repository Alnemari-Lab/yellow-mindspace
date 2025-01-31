import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="abstract-circle w-96 h-96 bg-yellow-200 -top-20 -left-20"></div>
        <div className="abstract-circle w-72 h-72 bg-orange-200 bottom-20 right-20"></div>
        <div className="abstract-circle w-64 h-64 bg-pink-200 top-40 right-40"></div>
      </div>
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-white">
            Discover Your
            <span className="block text-yellow-100 mt-2">Perfect Major</span>
          </h1>
          <p className="text-xl mb-8 text-yellow-50">
            Use AI-powered analysis and face recognition to find the academic path that matches your unique potential.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/register")}
              className="bg-white text-secondary hover:bg-yellow-50 px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="px-8 py-6 text-lg border-white text-white hover:bg-white/10"
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