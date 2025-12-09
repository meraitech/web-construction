import React from "react";
import Heading2 from "@/shared/components/ui/Heading2";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import Image from "next/image";

export default function ProjectSection() {
  return (
    <div className="md:mt-14">
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="xl:max-w-lg ">
            <Heading2 text="More than 250 dealerships completed" />
          </div>
          <p className="xl:text-xl lg:text-lg max-md:text-sm">
            The design and construction of car dealerships require specific
            expertise. Our team is well-versed in the standards and technical
            requirements specific to this industry.
          </p>
        </div>

        {/* showcase  */}
        <div className="flex max-lg:flex-col gap-6 ">
          <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl relative overflow-hidden group">
            <Image
              src={"/images/projects/1.jpg"}
              alt=""
              width={720}
              height={720}
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
          <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl relative overflow-hidden group ">
            <Image
              src={"/images/projects/2.jpg"}
              alt=""
              width={720}
              height={720}
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
          <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl relative overflow-hidden group">
            <Image
              src={"/images/projects/3.jpg"}
              alt=""
              width={720}
              height={720}
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
