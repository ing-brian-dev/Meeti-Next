import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeti Next",
  description: "Project Meeti Next.js with DrizzleORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable}  h-full bg-white antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
