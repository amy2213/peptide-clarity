import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peptide Clarity | Owner-only Data Preview",
  description: "Protected internal research-data architecture verification",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
