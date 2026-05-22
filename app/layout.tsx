import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerRibbon } from "@/components/DisclaimerRibbon";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "ThesisPoint",
    template: "%s | ThesisPoint",
  },
  description:
    "Conviction-driven investment research — stock reports, pitch decks, and market intelligence for serious investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen pb-10 font-sans`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <DisclaimerRibbon />
      </body>
    </html>
  );
}
