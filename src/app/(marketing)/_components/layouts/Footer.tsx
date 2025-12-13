import SectionContainer from "@/shared/components/ui/SectionContainer";
import CTASection from "../CTASection";
import { FacebookIcon, InstagramIcon, XIcon } from "../SocialMediaIcon";
import Heading2 from "@/shared/components/ui/Heading2";
import { LOGO_FOOTER } from "@/shared/constants/brand";

export default function Footer() {
  return (
    <div className="bg-foreground text-background p-8 md:p-14 2xl:p-20 md:mt-36 mt-24  rounded-t-4xl">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col">
        {/* <SectionContainer> */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* <div className="flex flex-col gap-4"> */}
          <CTASection />
          {/* <footer className="flex flex-col items-center gap-8 lg:gap-12 bg-foreground text-background rounded-4xl p-8 md:p-14 lg:p-20 mb-8"> */}
          <footer className="flex flex-col items-center gap-12 lg:gap-16 rounded-4xl mb-8">
            <div className="grid lg:grid-cols-3 max-lg:flex flex-col w-full gap-12 lg:gap-8">
              <div className="col-span-2 flex flex-col items-start gap-12 lg:gap-16">
                <div className="w-full lg:w-10/12">
                  <Heading2
                    text="Amet consectetur, adipisicing elit. Cum
                  nesciunt natus incidunt?"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="hover:-translate-y-1 duration-300">
                    <InstagramIcon />
                  </div>
                  <div className="hover:-translate-y-1 duration-300">
                    <FacebookIcon />
                  </div>
                  <div className="hover:-translate-y-1 duration-300">
                    <XIcon />
                  </div>
                </div>
              </div>

              <ul className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-8 w-full">
                <li className="text-2xl lg:text-4xl">Home</li>
                <li className="text-2xl lg:text-4xl">Projects</li>
                <li className="text-2xl lg:text-4xl">About Us</li>
              </ul>
            </div>

            <hr className="border-t w-full border-background/20" />

            {/* cr  */}
            <div className="w-full text-muted-foreground flex items-center justify-between ">
              <img src={LOGO_FOOTER} alt="" className="h-4 lg:h-6" />
              <p className="max-lg:text-sm">&copy; 2025 Merai Construction</p>
            </div>
          </footer>
        </div>
        {/* </SectionContainer> */}
      </div>
    </div>
  );
}
