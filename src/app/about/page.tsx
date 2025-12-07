import Image from "next/image";
import TeamSection from "./_components/TeamSection";

export default function AboutUsPage() {
  return (
    <div>
      {/* Title  */}
      <section className="h-[80dvh] w-full mt-22 px-8 relative">
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
        <div className="absolute bottom-0 z-5 p-16">
          <div className="flex flex-col gap-4 max-w-[700px]">
            <h1 className="text-6xl">About us</h1>
            <p className="text-xl">
              For over 35 years, we have brought ambitious projects to life. The
              pride in our work, the rigor in execution, teamwork, and integrity
              are the values that drive us every day.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />
    </div>
  );
}
