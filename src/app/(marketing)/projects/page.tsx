import { getProjects } from "@/features/project/services/project.service";
import Heading1 from "@/shared/components/ui/Heading1";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import { TypographyP } from "@/shared/components/ui/TypographyP";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectPage() {
  const { data } = await getProjects({ page: 1 });

  return (
    <div>
      <div className="h-20"></div>
      <SectionContainer>
        {/* Title  */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="xl:max-w-2xl ">
            <Heading1 text={"Construction Projects"} />
          </div>
          <TypographyP
            text="Explore a curated portfolio of completed automotive dealership and
            commercial construction projects—delivered with disciplined
            scheduling, strict quality control, and brand-aligned execution from
            planning to handover.
        "
          />
        </div>

        {/* Galery  */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <Link key={index} href={`/projects/${item.id}`} className="group">
              <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden">
                <Image
                  src={item.thumbnail?.url || ""}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 duration-300"
                  width={1080}
                  height={720}
                  draggable={false}
                />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <h3 className="text-2xl group-hover:text-accent">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
