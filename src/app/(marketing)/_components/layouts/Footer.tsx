import Link from "next/link";
import CTASection from "../CTASection";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "../SocialMediaIcon";
import Heading2 from "@/shared/components/ui/Heading2";
import { COMPANY_LOGO } from "@/shared/constants/brand";
import { getSettings } from "@/features/settings/services/settings.service";

export default async function Footer() {
  const data = await getSettings([
    "linkedin",
    "instagram",
    "company_email",
    "company_phone",
    "company_address",
  ]);

  return (
    <div className="bg-foreground text-background p-8 md:p-14 2xl:p-20 md:mt-36 mt-24 rounded-t-4xl">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col">
        <div className="flex flex-col gap-16 lg:gap-24">
          <CTASection />

          <footer className="flex flex-col items-center gap-12 lg:gap-16 rounded-4xl mb-8">
            <div className="grid lg:grid-cols-3 max-lg:flex flex-col w-full gap-12 lg:gap-8">
              {/* LEFT: Brand + SEO blurb + socials */}
              <div className="col-span-2 flex flex-col items-start gap-10 lg:gap-12">
                <div className="w-full lg:w-10/12">
                  <Heading2 text="Built for automotive brands. Engineered for performance." />
                  <p className="mt-4 text-base md:text-lg text-background/70 leading-relaxed">
                    Merai Construction delivers premium{" "}
                    <strong>automotive dealership construction</strong> and
                    commercial projects—from new builds to renovations—managed
                    end-to-end with disciplined scheduling, quality control, and
                    compliance across stakeholders.
                  </p>
                </div>

                {/* Optional business info (great for SEO + trust) */}
                <address className="not-italic text-sm md:text-base text-background/70 leading-relaxed">
                  {data?.company_address ? (
                    <p>{data.company_address}</p>
                  ) : (
                    <p>Commercial & Dealership Construction</p>
                  )}

                  <div className="mt-2 flex flex-col gap-1">
                    {data?.company_phone ? (
                      <a
                        href={`tel:${String(data.company_phone).replace(
                          /\s+/g,
                          ""
                        )}`}
                        className="hover:text-background duration-200"
                      >
                        {data.company_phone}
                      </a>
                    ) : null}

                    {data?.company_email ? (
                      <a
                        href={`mailto:${data.company_email}`}
                        className="hover:text-background duration-200"
                      >
                        {data.company_email}
                      </a>
                    ) : null}
                  </div>
                </address>

                <div className="flex gap-4">
                  <Link
                    href={data?.instagram || "#"}
                    aria-label="Merai Construction on Instagram"
                    className="hover:-translate-y-1 duration-300"
                    target={data?.instagram ? "_blank" : undefined}
                    rel={data?.instagram ? "noopener noreferrer" : undefined}
                  >
                    <InstagramIcon />
                  </Link>

                  <Link
                    href={data?.linkedin || "#"}
                    aria-label="Merai Construction on LinkedIn"
                    className="hover:-translate-y-1 duration-300"
                    target={data?.linkedin ? "_blank" : undefined}
                    rel={data?.linkedin ? "noopener noreferrer" : undefined}
                  >
                    <LinkedinIcon />
                  </Link>

                  <Link
                    href={"#"}
                    aria-label="Merai Construction on Facebook"
                    className="hover:-translate-y-1 duration-300"
                  >
                    <FacebookIcon />
                  </Link>

                  <Link
                    href={"#"}
                    aria-label="Merai Construction on X"
                    className="hover:-translate-y-1 duration-300"
                  >
                    <XIcon />
                  </Link>
                </div>
              </div>

              {/* RIGHT: Navigation + SEO internal linking */}
              <div className="w-full flex flex-col gap-8">
                <ul className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6 w-full">
                  <li className="text-2xl lg:text-4xl">
                    <Link
                      href="/"
                      className="hover:text-background/80 duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-2xl lg:text-4xl">
                    <Link
                      href="/projects"
                      className="hover:text-background/80 duration-200"
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="text-2xl lg:text-4xl">
                    <Link
                      href="/about"
                      className="hover:text-background/80 duration-200"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-t w-full border-background/20" />

            {/* Footer bottom */}
            <div className="w-full text-muted-foreground flex items-center justify-between gap-6">
              <img
                src={COMPANY_LOGO}
                alt="Merai Construction logo"
                className="h-4 lg:h-6 invert"
                loading="lazy"
              />
              <p className="max-lg:text-sm">
                &copy; {new Date().getFullYear()} Merai Construction. Dealership
                & Commercial Construction.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
