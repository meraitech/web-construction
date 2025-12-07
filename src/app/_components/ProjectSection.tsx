import Heading2 from "@/shared/components/ui/Heading2";
import React from "react";

export default function ProjectSection() {
  return (
    <section className="xl:pt-52 md:pt-36 pt-24 px-4 xl:px-12 md:px-8 flex flex-col gap-12 max-w-[1920px] mx-auto w-full duration-300">
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
        <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl"></div>
        <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl"></div>
        <div className="lg:h-104 h-56 lg:min-w-1/4 lg:w-1/3 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl"></div>
      </div>
    </section>
  );
}
