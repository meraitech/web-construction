export default function Heading1({ text }: { text: string }) {
  return (
    <h2 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-bold">
      {text}
    </h2>
  );
}
