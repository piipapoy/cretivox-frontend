import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAW Signal - Raffa Mizanul",
  description:
    "A Cretivox Frontend Endurance Test microsite by M. Raffa Mizanul Insan.",
};

export const viewport: Viewport = {
  themeColor: "#050713",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
