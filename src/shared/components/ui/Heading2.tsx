export default function Heading2({ text }: { text: string }) {
  return (
    <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
      {text}
    </h2>
  );
}
