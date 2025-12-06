"use client";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/shared/lib/gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin kiri (card besar)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // 3 karakter x 1 layar
          scrub: true,
          pin: true,
          markers: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".hero-welcome", { scale: 0.9 }, 0);
    });

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={containerRef}
      className="hero-welcome relative h-[200dvh] w-screen flex group z-0 "
    >
      <div className="h-screen w-full overflow-hidden rounded-4xl scale-105">
        <Image
          src={"/images/contents/hero.jpg"}
          width={1920}
          height={1080}
          alt=""
          className="h-full w-full object-cover duration-300 group-hover:scale-102 opacity-80 "
        />
      </div>

      <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-end p-12">
        <div className="max-w-[1920px] flex justify-between items-end w-full">
          {/* info  */}
          <div className="flex flex-col gap-6">
            <h1 className="text-7xl">
              Dealership <br /> builders
            </h1>
            {/* <span className="text-xl">Since 2012</span> */}
          </div>

          {/* awwards   */}
          <div className="" aria-label="Awwards">
            <button className="text-3xl cursor-pointer hover:text-accent max-md:hidden">
              En
            </button>
            {/* <div className="h-52 aspect-video bg-muted rounded-3xl"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
