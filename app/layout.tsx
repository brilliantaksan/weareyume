import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const lastik = localFont({
  src: [
    { path: "../public/fonts/Lastik.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Lastik.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-lastik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yu+Me — A Socratica node in Tokyo",
  description:
    "Yu+Me is a weekend co-working session in Shibuya for makers, dreamers and builders. Part of Socratica.",
  openGraph: {
    title: "Yu+Me — A Socratica node in Tokyo",
    description:
      "A weekend co-working session in Shibuya for makers, dreamers and builders.",
    url: "https://weareyume.com",
    siteName: "Yu+Me",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lastik.variable}`}>
      <body>{children}</body>
    </html>
  );
}
