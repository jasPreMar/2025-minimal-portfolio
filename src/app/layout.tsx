import type { Metadata } from "next";
import { Inter, Lato, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AnimatedHeader } from "@/components/animated-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const carmaxSharpSans = localFont({
  src: [
    {
      path: "./fonts/CarMaxSharpSansDisp-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CarMaxSharpSansDisp-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-carmax-sharp-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jason Marsh - Portfolio",
  description: "Designer in New York",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lato.variable} ${carmaxSharpSans.variable} ${spaceMono.variable} antialiased`}
      >
        <div className="flex flex-col mt-28 min-h-screen">
          <AnimatedHeader />
          <div className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
