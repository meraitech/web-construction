import Heading2 from "@/shared/components/ui/Heading2";
import { DUMMY_IMAGE } from "@/shared/constants/image";

export default function CTASection() {
  const listCTA = {
    contact: {
      heading: "Contact Us",
      location: "3433 boul. de la Pinière, bureau 203, Terrebonne, QC J6X 0A1",
      phone: "(450) 968-0300",
      email: "info@vincentetdussault.com",
    },
  };
  return (
    <div className="flex max-lg:flex-col max-lg:gap-4 text-foreground w-full">
      {/* left  */}
      <img
        src={DUMMY_IMAGE}
        alt=""
        className="max-lg:order-2 lg:h-105 aspect-square bg-muted-foreground rounded-4xl relative object-cover"
      />
      {/* right  */}
      <div className="w-full flex flex-col justify-center items-start gap-4 lg:gap-6 bg-muted rounded-4xl p-20 ">
        <Heading2 text={listCTA.contact.heading} />
        {/* <h3 className="text-4xl lg:text-5xl leading-tight">
          {listCTA.contact.heading}
        </h3> */}
        <div className="flex flex-col gap-2 lg:gap-4">
          <p className=" lg:text-xl">{listCTA.contact.phone}</p>
          <p className=" lg:text-xl">{listCTA.contact.email}</p>
          <p className=" lg:text-xl max-w-sm">{listCTA.contact.location}</p>
        </div>
      </div>
    </div>
  );
}
