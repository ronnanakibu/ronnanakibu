import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RONN — Digital Playground",
  description: "A cinematic, minimalist, interactive portfolio for Rony Imanuel Sihombing — multimedia creator, photographer, designer, and computer engineering student.",
  keywords: ["Rony Imanuel Sihombing", "RONN", "Portfolio", "Multimedia Explorer", "Developer", "Photographer", "Computer Engineering"],
  authors: [{ name: "Rony Imanuel Sihombing" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans min-h-full bg-bg-dark text-text-main relative`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

