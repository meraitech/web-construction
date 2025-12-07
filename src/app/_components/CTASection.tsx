import CTAButton from "@/shared/components/ui/CTAButton";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import Image from "next/image";

export default function CTASection() {
  const listCTA = [
    {
      title:
        "Lorem ipsum dolor sit amet amet consectetur adipisicing elit. Eveniet ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quaerat est ipsum non a in incidunt impedit molestias dicta alias? Lorem ipsum dolor sit amet",
      backgroundImage: "/images/contents/cta1.jpg",
      ctaText: "All Project",
      ctaMonocrom: false,
    },
    {
      title:
        "Lorem ipsum dolor sit amet amet consectetur adipisicing elit. Eveniet blanditiis quam distinctio",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quaerat est ipsum non a in incidunt impedit molestias dicta alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et beatae maiores optio ipsam",
      backgroundImage: "/images/contents/cta2.jpg",
      ctaText: "Contact Us",
      ctaMonocrom: true,
    },
  ];
  return (
    <SectionContainer>
      <div className="grid grid-cols-2 gap-8">
        {listCTA.map((item, i) => (
          <div
            key={i}
            className="lg:h-150 h-56 w-full lg:hover:w-full duration-1000  rounded-4xl p-12 flex flex-col gap-4 justify-between relative overflow-hidden"
          >
            <h3 className="text-4xl leading-tight">{item.title}</h3>

            <div className="flex justify-between items-end">
              <div className=""></div>
              {/* <p className="w-3/4 text-justify">{item.description}</p> */}

              <div className="">
                <CTAButton
                  href="/project"
                  text={item.ctaText}
                  monocrome={item.ctaMonocrom}
                />
              </div>
            </div>

            <div className="absolute top-0 left-0  w-full h-full -z-1 bg-muted">
              <Image
                src={item.backgroundImage}
                alt=""
                width={720}
                height={720}
                className=" w-full h-full object-cover opacity-40"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
