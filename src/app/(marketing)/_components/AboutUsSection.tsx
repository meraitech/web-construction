import CTAButton from "@/shared/components/ui/CTAButton";
import Heading2 from "@/shared/components/ui/Heading2";
import { TypographyP } from "@/shared/components/ui/TypographyP";
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="pt-40">
      {/* image  */}
      <div className="h-180 bg-muted rounded-4xl overflow-hidden">
        <Image
          src={"/images/contents/about1.jpg"}
          alt=""
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mx-auto -mt-44 max-w-[1400px] p-4 md:p-8 lg:p-12 w-full flex max-lg:flex-col gap-12 items-center">
        {/* image  */}
        <div className="max-sm:aspect-3/4 sm:h-210 lg:w-1/2 w-full rounded-4xl overflow-hidden drop-shadow-2xl">
          <Image
            src={"/images/contents/about2.jpg"}
            alt=""
            width={720}
            height={1280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* content  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 items-start">
          <Heading2 text="The Leader in Dealership Construction" />
          <div className="flex flex-col gap-4 text-xl mb-2 md:mb-8">
            <TypographyP text="Automotive construction demands precision, brand consistency, and regulatory expertise. At Merai Construction, we manage every approval stage in close coordination with manufacturers, consultants, and local authorities." />
            <TypographyP text="Our integrated approach ensures your dealership project—whether new construction, expansion, or renovation—is delivered efficiently, cost-effectively, and fully aligned with global brand standards." />
          </div>
          {/* CTA  */}
          <CTAButton href="/about" text="About Us" />
        </div>
      </div>
    </section>
  );
}
