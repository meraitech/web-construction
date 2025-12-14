import { getTeams } from "@/features/team/services/team.service";
import Heading2 from "@/shared/components/ui/Heading2";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import Image from "next/image";

export default async function TeamSection() {
  const { data: teams } = await getTeams({ page: 1, limit: 12 });
  // console.log("data : ", team);
  return (
    <SectionContainer>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="xl:max-w-lg ">
          <Heading2 text="A team built for complex construction projects" />
        </div>
        <p className="xl:text-xl lg:text-lg max-md:text-sm">
          Our multidisciplinary team brings together construction management,
          site supervision, quality control, and coordination expertise. This
          complementary approach helps us solve complex constraints, reduce risk
          on site, and deliver consistent results—on schedule and aligned with
          project specifications.
        </p>
      </div>

      <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 duration-300">
        {teams.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden">
              <Image
                src={item.profile?.url || ""}
                alt=""
                className="w-full h-full object-cover"
                width={720}
                height={1080}
                draggable={false}
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 md:gap-2">
              <h3 className="text-xl lg:text-2xl">{item.name}</h3>
              <p className="max-md:text-sm">{item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
