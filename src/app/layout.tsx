import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#FFD60A",
};

export const metadata: Metadata = {
  title: "LockIn - Focus Together",
  description:
    "Your friends won't let you scroll. Form pacts with friends, lock distracting apps, and hold each other accountable. Coming to iOS.",
  openGraph: {
    title: "LockIn - Focus Together",
    description:
      "Form pacts with friends. Lock distracting apps. Only they can set you free.",
    url: "https://locked-in.dev",
    siteName: "LockIn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LockIn - Focus Together",
    description:
      "Form pacts with friends. Lock distracting apps. Only they can set you free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-black font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
