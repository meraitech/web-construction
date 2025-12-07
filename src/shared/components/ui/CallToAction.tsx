import Link from "next/link";

export default function CallToAction({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="py-2 border-2 rounded-full px-6 border-accent text-accent hover:bg-accent hover:text-background duration-300 items-center flex"
    >
      {text} {"->"}
    </Link>
  );
}
