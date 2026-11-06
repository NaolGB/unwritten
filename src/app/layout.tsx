import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Ethiopic } from "next/font/google";
import { description, siteUrl, tagline } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Geist has no Ethiopic letters, so Amharic falls through to this.
const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Unwritten – ${tagline}`,
  description,
  openGraph: {
    type: "website",
    title: "Unwritten",
    description,
    url: "/",
    siteName: "Unwritten",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoEthiopic.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only rounded-lg bg-foreground px-4 py-3 text-background focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
