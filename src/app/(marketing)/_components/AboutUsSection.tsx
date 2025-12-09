import CTAButton from "@/shared/components/ui/CTAButton";
import Heading2 from "@/shared/components/ui/Heading2";
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

      <div className="mx-auto -mt-44 max-w-[1400px] p-12 w-full flex gap-12 items-center">
        {/* image  */}
        <div className="h-210 w-1/2 rounded-4xl overflow-hidden drop-shadow-2xl">
          <Image
            src={"/images/contents/about2.jpg"}
            alt=""
            width={720}
            height={1280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* content  */}
        <div className="w-1/2 flex flex-col gap-6 items-start">
          <Heading2 text="The leader in dealership construction" />
          <div className="flex flex-col gap-4 text-xl mb-8">
            <p>
              The automotive industry demands a flawless brand image. That’s why
              we meticulously manage each approval step in collaboration with
              manufacturers and municipalities. Our synergistic approach
              optimizes the efficiency and profitability of your new
              construction, expansion, or renovation projects.
            </p>
          </div>
          {/* CTA  */}
          <CTAButton href="/about-us" text="About Us" />
        </div>
      </div>
    </section>
  );
}
