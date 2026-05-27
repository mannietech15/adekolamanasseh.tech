import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Adekola Manasseh — Full-Stack Developer",
  description:
    "16-year-old Physics student at Unilag building full-stack web apps with React, Next.js, Node.js and more.",
  openGraph: {
    title: "Adekola Manasseh — Full-Stack Developer",
    description:
      "16-year-old Physics student at Unilag building full-stack web apps with React, Next.js, Node.js and more.",
    url: "https://adekola.dev",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${greatVibes.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
