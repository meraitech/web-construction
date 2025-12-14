import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTAButton({
  href,
  text,
  monocrome = false,
}: {
  href: string;
  text: string;
  monocrome?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`py-2 md:py-3 rounded-full px-5 md:px-6 ${
        monocrome
          ? "bg-foreground hover:bg-white/50"
          : "bg-accent hover:bg-foreground"
      }  text-background duration-300 items-center justify-center flex gap-2`}
    >
      <span>{text}</span>
      <ArrowRight />
    </Link>
  );
}
