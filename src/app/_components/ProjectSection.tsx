import Heading2 from "@/shared/components/ui/Heading2";
import React from "react";

export default function ProjectSection() {
  return (
    <section className="pt-28 px-12 flex flex-col gap-12 max-w-[1920px] mx-auto w-full">
      <div className="text-center mx-auto max-w-2xl flex flex-col items-center gap-4">
        <div className="max-w-lg">
          <Heading2 text="More than 250 dealerships completed" />
        </div>
        <p className="text-xl">
          The design and construction of car dealerships require specific
          expertise. Our team is well-versed in the standards and technical
          requirements specific to this industry.
        </p>
      </div>

      {/* showcase  */}
      <div className="flex gap-6">
        <div className="h-104 min-w-1/4 w-1/3 hover:w-full duration-1000 bg-muted rounded-4xl"></div>
        <div className="h-104 min-w-1/4 w-1/3 hover:w-full duration-1000 bg-muted rounded-4xl"></div>
        <div className="h-104 min-w-1/4 w-1/3 hover:w-full duration-1000 bg-muted rounded-4xl"></div>
      </div>
    </section>
  );
}
