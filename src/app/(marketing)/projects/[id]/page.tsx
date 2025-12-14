import { getProjectById } from "@/features/project/services/project.service";
import Heading1 from "@/shared/components/ui/Heading1";
import SectionContainer from "@/shared/components/ui/SectionContainer";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectByIdPage({ params }: PageProps) {
  const { id } = await params; // ✅ unwrap ReactPromise
  const data = await getProjectById(id);

  return (
    <div>
      <div className="h-20"></div>
      <SectionContainer>
        {/* Title  */}
        <div className=" flex flex-col gap-4 max-w-4xl">
          <Heading1 text={data?.title || ""} />
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-20">
          <ClientDetailComponent
            title="Client"
            content={data?.client_name || ""}
          />
          <ClientDetailComponent
            title="Location"
            content={data?.location || ""}
          />
          <ClientDetailComponent
            title="Project Type"
            content={data?.project_type || ""}
          />
        </div>

        {/* Galery  */}
        {data?.gallery && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 w-full aspect-[5/2.5] lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden">
              <Image
                src={data.thumbnail?.url || ""}
                alt=""
                className="w-full h-full object-cover"
                width={1080}
                height={720}
                draggable={false}
              />
            </div>
            {data?.gallery.map((item, index) => (
              <GaleryCard key={index} url={item.url} />
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}

const GaleryCard = ({ url }: { url: string }) => {
  return (
    <div className="w-full aspect-video lg:hover:w-full duration-1000 bg-muted rounded-4xl overflow-hidden">
      <Image
        src={url}
        alt=""
        className="w-full h-full object-cover"
        width={1080}
        height={720}
        draggable={false}
      />
    </div>
  );
};

const ClientDetailComponent = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="">
      <h2 className="max-md:text-xs text-sm">{title}</h2>
      <p className="text-xl lg:text-2xl">{content}</p>
    </div>
  );
};
