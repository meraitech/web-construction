"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "@/shared/lib/gsap";
import Link from "next/link";
import { TO_ABOUT, TO_HOME, TO_PROJECTS } from "@/shared/constants/url";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_LOGO } from "@/shared/constants/brand";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();

  useLayoutEffect(() => {
    if (!isClient) return;

    gsap.killTweensOf([".mobile-drawer-backdrop", ".mobile-drawer-panel"]);

    if (open) {
      gsap.set(".mobile-drawer", { pointerEvents: "auto" });

      gsap.to(".mobile-drawer-backdrop", {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.fromTo(
        ".mobile-drawer-panel",
        { y: -12, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(".mobile-drawer-backdrop", {
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to(".mobile-drawer-panel", {
        y: -8,
        autoAlpha: 0,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(".mobile-drawer", { pointerEvents: "none" });
        },
      });
    }
  }, [open, isClient]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const overlay = (
    <div className="mobile-drawer md:hidden fixed inset-0 z-50 pointer-events-none">
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={() => setOpen(false)}
        className="mobile-drawer-backdrop fixed inset-0 bg-black/40 opacity-0"
        style={{ pointerEvents: open ? "auto" : "none" }}
      />
      <div className="mobile-drawer-panel fixed left-4 right-4 top-[88px] opacity-0">
        <div className="bg-foreground text-background rounded-2xl px-6 py-5 backdrop-blur-sm">
          <nav>
            <ol className="flex flex-col gap-4">
              <Link href={TO_HOME} onClick={() => setOpen(false)}>
                <li>Home</li>
              </Link>
              <Link href={TO_PROJECTS} onClick={() => setOpen(false)}>
                <li>Projects</li>
              </Link>
              <Link href={TO_ABOUT} onClick={() => setOpen(false)}>
                <li>About</li>
              </Link>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground text-background"
      >
        <span className="relative block w-5 h-5">
          <span
            className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition-transform duration-200 ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-2.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-transform duration-200 ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isClient ? createPortal(overlay, document.body) : null}
    </>
  );
}

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
          end: "+=150%",
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
    <header
      ref={containerRef}
      className="navbar fixed top-8 left-0 z-50 w-full"
    >
      <div className="w-full flex justify-between px-4 md:px-8 mx-auto max-w-[1920]">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-8 md:h-10 w-full">
            <Image
              src={COMPANY_LOGO}
              alt="Company Logo"
              className="w-full h-full object-contain"
              width={1080}
              height={720}
            />
          </div>
        </div>

        {/* NAV (desktop unchanged) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div className="bg-foreground text-background backdrop-blur-sm px-12 rounded-full flex items-center justify-center gap-8 max-md:hidden h-12">
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

        {/* Right slot: keep spacing; show burger on mobile */}
        <div className="w-[70px] flex items-center justify-end ">
          <MobileNav key={pathname} />
        </div>
      </div>
    </header>
  );
}
