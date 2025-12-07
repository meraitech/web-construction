"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/shared/lib/gsap";
import Link from "next/link";
import {
  TO_ABOUT,
  TO_CONTACT,
  TO_HOME,
  TO_PROJECTS,
} from "@/shared/constants/url";
import Image from "next/image";
import { COMPANY_LOGO } from "@/shared/constants/brand";
import { usePathname } from "next/navigation";

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
    <header className="navbar fixed top-4 left-0 z-50 w-full ">
      <div className="w-full flex justify-between px-8 mx-auto max-w-[1920]">
        {/* Logo   */}
        <span className="text-lg font-bold leading-5">
          <Image src={COMPANY_LOGO} alt="" width={70} height={70} />
        </span>
        <div className="">
          <div className="bg-foreground/80 text-background backdrop-blur-sm py-4 px-12 rounded-full flex items-center justify-center gap-8">
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
                <Link href={TO_CONTACT}>
                  <li>Contact</li>
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
