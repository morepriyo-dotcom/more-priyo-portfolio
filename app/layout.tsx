import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://more-priyo-portfolio.vercel.app"),
  title: "More Priyo | Data Science + AI Developer",
  description:
    "Personal portfolio of More Priyo, a B.Tech CSE (Data Science) student and developer building civic technology and AI platforms.",
  keywords: [
    "More Priyo",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "CVR College of Engineering",
    "JanSetu AI",
    "Back2U",
    "SkillBridge",
  ],
  authors: [{ name: "More Priyo", url: "https://github.com/morepriyo-dotcom" }],
  creator: "More Priyo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://more-priyo-portfolio.vercel.app",
    title: "More Priyo | Data Science + AI Developer",
    description:
      "Personal portfolio of More Priyo, B.Tech CSE (Data Science) student and developer building civic technology and AI platforms.",
    siteName: "More Priyo Portfolio",
    images: [
      {
        url: "/more-priyo.jpeg",
        width: 800,
        height: 800,
        alt: "More Priyo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "More Priyo | Data Science + AI Developer",
    description:
      "Personal portfolio of More Priyo, B.Tech CSE (Data Science) student and developer building civic technology and AI platforms.",
    images: ["/more-priyo.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
