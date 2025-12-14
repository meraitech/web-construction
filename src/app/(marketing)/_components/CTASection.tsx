import { getSettings } from "@/features/settings/services/settings.service";
import Heading2 from "@/shared/components/ui/Heading2";
import { DUMMY_IMAGE } from "@/shared/constants/image";

export default async function CTASection() {
  const data = await getSettings(["phone", "address", "email"]);

  // const listCTA = {
  //   contact: {
  //     heading: "Contact Us",
  //     location: "3433 boul. de la Pinière, bureau 203, Terrebonne, QC J6X 0A1",
  //     phone: "(450) 968-0300",
  //     email: "info@vincentetdussault.com",
  //   },
  // };
  return (
    <div className="flex max-lg:flex-col max-lg:gap-4 text-foreground w-full">
      {/* left  */}
      <img
        src={DUMMY_IMAGE}
        alt=""
        className="max-lg:order-2 lg:h-105 aspect-square bg-muted-foreground rounded-4xl relative object-cover"
      />
      {/* right  */}
      <div className="w-full flex flex-col justify-center items-start gap-4 lg:gap-6 bg-muted rounded-4xl p-8 md:p-14 lg:p-20 ">
        <Heading2 text={"Contact Us"} />
        <div className="flex flex-col gap-2 lg:gap-4 max-md:text-sm lg:text-xl">
          <p>{data["phone"]}</p>
          <p>{data["email"]}</p>
          <p className="max-w-sm">{data["address"]}</p>
        </div>
      </div>
    </div>
  );
}
