import Heading2 from "@/shared/components/ui/Heading2";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import React from "react";

export default function TeamSection() {
  return (
    <SectionContainer>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="xl:max-w-lg ">
          <Heading2 text="A strong team" />
        </div>
        <p className="xl:text-xl lg:text-lg max-md:text-sm">
          The complementarity of our teams enables us to tackle any challenges
          and deliver exceptional projects.
        </p>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-6 duration-300">
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        <div className="aspect-3/4 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
      </div>
    </SectionContainer>
  );
}
