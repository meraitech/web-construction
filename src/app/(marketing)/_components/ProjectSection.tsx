import React from "react";
import Heading2 from "@/shared/components/ui/Heading2";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import Image from "next/image";
import { TypographyP } from "@/shared/components/ui/TypographyP";
import { getProjects } from "@/features/project/services/project.service";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function ProjectSection() {
  const { data } = await getProjects({ page: 1, limit: 3 });

  return (
    <div className="md:mt-14">
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="xl:max-w-2xl ">
            <Heading2
              text="Over 250 Automotive Dealerships Successfully Delivered
"
            />
          </div>
          <TypographyP
            text="We specialize in the design and construction of automotive dealerships that meet strict brand, technical, and operational standards. 
Our experience spans new builds, renovations, and large-scale expansions—delivered on time and aligned with manufacturer requirements.
"
          />
        </div>

        {/* showcase  */}
        <div className="flex max-lg:flex-col gap-6 ">
          {data.map((item, i) => (
            <Link
              key={i}
              href={`/projects/${item.id}`}
              className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl relative overflow-hidden group"
            >
              <div className="w-full h-full">
                <Image
                  src={item.thumbnail?.url || ""}
                  alt={item.title + " Image"}
                  draggable={false}
                  width={720}
                  height={720}
                  className="absolute top-0 left-0 h-full w-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={"/projects"}
          className="ml-auto flex gap-2 text-accent hover:translate-x-2 duration-300 hover:scale-105"
        >
          <p>All Projects</p>
          <ArrowRight />
        </Link>
      </SectionContainer>
    </div>
  );
}
