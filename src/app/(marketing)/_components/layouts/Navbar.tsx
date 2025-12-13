"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/shared/lib/gsap";
import Link from "next/link";
import { TO_ABOUT, TO_HOME, TO_PROJECTS } from "@/shared/constants/url";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LOGO_SECONDARY } from "@/shared/constants/brand";

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "+=10% start",
          end: "+=150%", // 3 karakter x 1 layar
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.from(".navbar", { translateY: -200 }, 0);
    });

    return () => ctx.revert();
  }, [pathname]);
  return (
    <header className="navbar fixed top-8 left-0 z-50 w-full ">
      <div className="w-full flex justify-between px-8 mx-auto max-w-[1920]">
        {/* Logo   */}
        <span className="h-12 ">
          <Image
            src={LOGO_SECONDARY}
            alt=""
            className="w-full h-full"
            width={1080}
            height={720}
          />
        </span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div className="bg-foreground text-background backdrop-blur-sm py-4 px-12 rounded-full flex items-center justify-center gap-8">
            <nav>
              <ol className="flex gap-6">
                <Link href={TO_HOME}>
                  <li>Home</li>
                </Link>
                <Link href={TO_PROJECTS}>
                  <li>Projects</li>
                </Link>
                <Link href={TO_ABOUT}>
                  <li>About</li>
                </Link>
              </ol>
            </nav>
          </div>
        </div>
        <div className="w-[70px]"></div>
      </div>
    </header>
  );
}
