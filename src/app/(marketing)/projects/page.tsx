import SectionContainer from "@/shared/components/ui/SectionContainer";

export default function ProjectPage() {
  return (
    <div>
      <div className="h-20"></div>
      <SectionContainer>
        {/* Title  */}
        <div className=" flex flex-col gap-4 max-w-[500px]">
          <h1 className="text-6xl">Projects</h1>
          <p className="text-xl">
            We are proud to showcase a selection of our most outstanding
            projects.
          </p>
        </div>

        {/* Galery  */}
        <div className="grid grid-cols-3 gap-6">
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
          <div className="lg:h-80 h-56 w-full lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden"></div>
        </div>
      </SectionContainer>
    </div>
  );
}
