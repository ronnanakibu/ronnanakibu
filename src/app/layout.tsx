import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RONN — Digital Playground",
  description: "A cinematic, minimalist, interactive portfolio for Rony Imanuel Sihombing — multimedia creator, photographer, designer, and computer engineering student.",
  keywords: ["Rony Imanuel Sihombing", "RONN", "Portfolio", "Multimedia Explorer", "Developer", "Photographer", "Computer Engineering"],
  authors: [{ name: "Rony Imanuel Sihombing" }],
};

import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Environment from "@/components/canvas/Environment";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-full bg-bg-dark text-text-main relative cursor-none">
        <Environment />
        <div className="noise-overlay" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
