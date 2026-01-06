import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AnimatedHeader } from "@/components/animated-header";
import { ProjectTitleProvider } from "@/components/project-title-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
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
        className={`${inter.variable} ${lato.variable} ${carmaxSharpSans.variable} antialiased bg-background text-foreground`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateTheme() {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
                updateTheme();
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
              })();
            `,
          }}
        />
        <ProjectTitleProvider>
          <div className="max-w-[608px] mx-auto mt-28 mb-28 px-8 flex flex-col">
            <AnimatedHeader />
            {children}
          </div>
        </ProjectTitleProvider>
      </body>
    </html>
  );
}
