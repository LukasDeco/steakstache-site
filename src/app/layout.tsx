import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { AppWrapper } from "@/components/AppWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SteakStache",
  description: "SteakStache",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>
          <div className="bg-[var(--color-text-primary)] w-full min-h-screen pb-20 font-[family-name:var(--font-geist-sans)] lg:px-12 lg:py-10 p-0">
            <div className="bg-[radial-gradient(150%_100%_at_50%_60%,var(--color-primary-neon)_0%,var(--color-secondary-accent)_40%,var(--color-background)_70%)] lg:rounded-3xl sm:bg-[radial-gradient(100%_100%_at_50%_80%,var(--color-primary-neon)_0%,var(--color-secondary-accent)_40%,var(--color-background)_70%)] w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
              <Nav />
              {children}
            </div>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center w-full mt-10 text-neutral-700">
              SteakStache © 2025
            </footer>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
