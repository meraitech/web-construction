import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-screen flex group">
      <div className="h-full w-full overflow-hidden">
        <Image
          src={"/images/contents/hero.jpg"}
          width={1920}
          height={1080}
          alt=""
          className="h-full w-full object-cover duration-300 group-hover:scale-102"
        />
      </div>

      <div className="absolute bottom-0 w-full h-full z-1 flex justify-center items-end p-12">
        <div className="max-w-[1920px] flex justify-between w-full">
          {/* info  */}
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl">
              Dealership <br /> builders
            </h1>
            <span className="text-xl">Since 2012</span>
          </div>

          {/* awwards   */}
          <div className="" aria-label="Awwards">
            <div className="h-52 aspect-video bg-muted rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
