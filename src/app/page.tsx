import AboutUsSection from "./_components/AboutUsSection";
import CTASection from "./_components/CTASection";
import FeedbackSection from "./_components/FeedbackSection";
import HeroSection from "./_components/HeroSection";
import ProjectSection from "./_components/ProjectSection";

export default function HomePage() {
  return (
    <div className="flex flex-col  overflow-hidden">
      <HeroSection />
      <div className="z-1 bg-background">
        <ProjectSection />
        <AboutUsSection />
        <FeedbackSection />
        <CTASection />
      </div>
    </div>
  );
}
