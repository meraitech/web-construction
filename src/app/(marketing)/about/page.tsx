import Image from "next/image";
import TeamSection from "./_components/TeamSection";
import Heading1 from "@/shared/components/ui/Heading1";
import { TypographyP } from "@/shared/components/ui/TypographyP";

export default function AboutUsPage() {
  return (
    <div>
      {/* Title  */}
      <section className="h-[80dvh] w-full mt-22 md:px-4 lg:px-8 relative">
        <div className="w-full h-full bg-muted rounded-4xl relative overflow-hidden">
          <div className="absolute w-full h-1/2 bg-linear-to-t from-background bottom-0 z-2"></div>
          <Image
            src={"/images/about/team.jpg"}
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 z-5 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col gap-4 lg:gap-8 max-w-4xl">
            <Heading1 text={"About Merai Construction"} />
            <TypographyP text=" For over 35 years, Merai Construction has delivered high-standard automotive dealership and commercial builds—combining disciplined project management, rigorous execution, and a culture of integrity." />
          </div>
        </div>
      </section>

      <TeamSection />
    </div>
  );
}
