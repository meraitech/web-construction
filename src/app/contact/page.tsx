import SectionContainer from "@/shared/components/ui/SectionContainer";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <SectionContainer>
        <div className="grid grid-cols-2 gap-6">
          {/* content  */}
          <div className="w-full h-full bg-muted aspect-square rounded-4xl p-12 flex flex-col justify-center text-2xl gap-6">
            <h1 className="text-7xl">Contact us</h1>
            <p className="max-w-[270px]">
              3433 boul. de la Pinière, bureau 203, Terrebonne, QC J6X 0A1
            </p>
            <p>(450) 968-0300</p>
            <p>info@vincentetdussault.com</p>
          </div>
          <div className="w-full h-full bg-muted aspect-square rounded-4xl"></div>
        </div>
      </SectionContainer>
    </div>
  );
}
