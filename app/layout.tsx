import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Scratchpad from "@/components/ui/Scratchpad";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silicon City — Interactive GATE CSE Prep Platform",
  description: "Master GATE CSE visually with interactive simulators, step-by-step solutions, and comprehensive coverage of computer science fundamentals.",
  openGraph: {
    title: "Silicon City — Interactive GATE CSE Prep Platform",
    description: "Master GATE CSE visually with interactive simulators, step-by-step solutions, and comprehensive coverage of computer science fundamentals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* The Peaceful Header */}
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-md shadow-sm" />
                <span className="font-bold tracking-tight text-slate-900 dark:text-slate-100">SILICON CITY</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-1.5 w-24 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full w-2 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Void Phase</span>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            {children}
          </main>

          <Scratchpad />
        </ThemeProvider>
      </body>
    </html>
  );
}