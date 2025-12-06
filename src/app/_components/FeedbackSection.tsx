import Heading2 from "@/shared/components/ui/Heading2";

export default function FeedbackSection() {
  return (
    <section className="pt-28 flex flex-col gap-12  w-full">
      <div className="max-w-[1920px] mx-auto px-12 w-full">
        <div className="max-w-md">
          <Heading2 text="Don't just take our word for it" />
        </div>
      </div>

      <ul className="flex items-center overflow-auto gap-4">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ul>
    </section>
  );
}

function Comment() {
  return (
    <li className="bg-muted p-12 rounded-4xl h-104 aspect-video flex flex-col justify-center">
      <p className="text-2xl mb-8 italic">
        I have worked with other firms in the past, and I greatly appreciated
        the expertise of Vincent & Dussault. Their experience in the automotive
        industry is a real asset. It provides better guidance. They are
        well-equipped, which immediately put me at ease.
      </p>

      <h4 className="text-3xl mb-2">Mathieu Spinelli</h4>
      <p>Président, Groupe Spinelli</p>
    </li>
  );
}
