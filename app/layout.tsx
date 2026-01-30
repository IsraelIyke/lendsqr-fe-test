import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Lendsqr Test App",
  description: "A test application for Lendsqr built with React.js",
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
