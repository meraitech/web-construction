import React from "react";

export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:pt-36 pt-24 px-4 xl:px-12 md:px-8 flex flex-col duration-300">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col gap-12">
        {children}
      </div>
    </section>
  );
}
