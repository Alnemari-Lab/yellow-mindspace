import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <Hero />
        <Features />
      </div>
    </main>
  );
};

export default Index;