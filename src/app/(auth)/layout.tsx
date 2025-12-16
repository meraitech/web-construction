import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/admin.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Merai Connstruction";
const SITE_URL = "https://web-construction-seven.vercel.app"; // ganti ke domain custom kalau sudah ada

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} - Login Dashboard`,
    template: `%s — ${SITE_NAME} Construction`,
  },

  description:
    "We deliver commercial and automotive facility builds with disciplined execution, safety-first standards, and predictable outcomes—from planning to handover.",

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Construction & Project Delivery`,
    description:
      "Commercial and automotive facility construction—delivered with rigor, safety, and on-time execution.",
    images: [
      {
        url: "/brand/Logo.png", // FOTO PREVIEW LINK (lihat cara ganti di bawah)
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Construction & Project Delivery`,
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Construction & Project Delivery`,
    description:
      "Commercial and automotive facility construction—delivered with rigor, safety, and on-time execution.",
    images: ["/brand/Logo.png"],
  },

  // favicon & icons
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },

  alternates: {
    canonical: SITE_URL,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
