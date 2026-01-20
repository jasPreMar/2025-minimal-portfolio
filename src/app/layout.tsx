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
  description: "Product Designer in New York specializing in AI/ML interfaces, design systems, and conversational UX. Currently at CarMax building AI-powered customer experiences.",
  keywords: [
    "Jason Marsh",
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "New York Designer",
    "NYC Designer",
    "AI Design",
    "AI UX",
    "Machine Learning Design",
    "Conversational UX",
    "Chatbot Design",
    "Design Systems",
    "Component Libraries",
    "React Design",
    "Frontend Design",
    "CarMax",
    "Portfolio",
    "Product Design Portfolio",
    "UX Portfolio",
  ],
  authors: [{ name: "Jason Marsh" }],
  creator: "Jason Marsh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jason Marsh - Portfolio",
    description: "Product Designer in New York specializing in AI/ML interfaces, design systems, and conversational UX.",
    siteName: "Jason Marsh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Marsh - Portfolio",
    description: "Product Designer in New York specializing in AI/ML interfaces, design systems, and conversational UX.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme() {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.toggle('dark', isDark);
                }
                setTheme();
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
              })();
            `,
          }}
        />
        <div className="flex flex-col mt-28 min-h-screen">
          <AnimatedHeader />
          <div className="flex-1 pb-28">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
