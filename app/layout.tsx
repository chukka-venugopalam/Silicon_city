import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silicon City — The Computational Universe",
  description: "From the Void to the Stars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* The Peaceful Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500 rounded-md shadow-sm" />
              <span className="font-bold tracking-tight text-slate-900">SILICON CITY</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-2 bg-emerald-500 rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Void Phase</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}