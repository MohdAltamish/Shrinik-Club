import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHRINIK CLUB",
  description: "Shrinik — Technology, creativity and culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
