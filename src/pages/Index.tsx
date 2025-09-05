import { Hero } from "@/components/Hero";
import { TravelPlanningForm } from "@/components/TravelPlanningForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="py-16 px-4">
        <TravelPlanningForm />
      </div>
    </div>
  );
};

export default Index;
