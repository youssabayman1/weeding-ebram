import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weeding-ebram.vercel.app"),
  title: "Ebram & Marina Wedding",
  description: "We joyfully invite you to celebrate the wedding of Ebram & Marina. Join us on September 3, 2026.",
  applicationName: "Ebram & Marina Wedding",
  openGraph: {
    title: "Ebram & Marina Wedding",
    description: "We joyfully invite you to celebrate the wedding of Ebram & Marina. Join us on September 3, 2026.",
    url: "https://weeding-ebram.vercel.app",
    siteName: "Ebram & Marina Wedding",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ebram & Marina Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebram & Marina Wedding",
    description: "We joyfully invite you to celebrate the wedding of Ebram & Marina. Join us on September 3, 2026.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
