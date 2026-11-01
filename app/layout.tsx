import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "More Priyo | Data Science + AI Developer",
  description:
    "More Priyo’s portfolio: exploring data science, artificial intelligence, and thoughtful technology.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
