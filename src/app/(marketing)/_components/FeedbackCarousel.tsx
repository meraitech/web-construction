"use client";

import Heading2 from "@/shared/components/ui/Heading2";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import { Testimonial } from "@/shared/db/schema";
import { useRef } from "react";

export default function FeedbackCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ down: false, startX: 0, startScrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    drag.current.down = true;
    drag.current.startX = e.clientX;
    drag.current.startScrollLeft = el.scrollLeft;

    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el || !drag.current.down) return;

    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScrollLeft - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <SectionContainer>
      <div className="max-w-2xl">
        <Heading2 text="Trusted by Leading Automotive Brands" />
      </div>

      {/* scroller masih di dalam SectionContainer agar garisnya sama */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="
            overflow-x-auto overflow-y-visible
            cursor-grab active:cursor-grabbing
            no-scrollbar touch-pan-x
            pb-4

            /* breakout keluar dari padding SectionContainer */
            -mx-4 md:-mx-8 xl:-mx-12
            /* balikin padding agar item pertama sejajar */
            px-4 md:px-8 xl:px-12
          "
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <ul className="flex gap-4 select-none">
            {testimonials.map((t) => (
              <Comment key={t.id} t={t} />
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}

function Comment({ t }: { t: Testimonial }) {
  return (
    <li className="bg-muted p-8 lg:p-12 rounded-3xl h-60 md:h-80 lg:h-96 w-[85vw] md:w-[500px] lg:w-[600px] flex flex-col justify-center shrink-0">
      <p className="text-sm md:text-xl lg:text-2xl mb-4 lg:mb-8 italic wrap-break-word line-clamp-5">
        {t.message}
      </p>

      <h4 className="text-lg md:text-2xl lg:text-3xl md:mb-2 font-bold">
        {t.client_name}
      </h4>

      <p className="max-lg:text-sm">{t.position}</p>
    </li>
  );
}
