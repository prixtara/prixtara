import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Prixtara — Intelligence, Built for the Real World",
  description: "AI that sees, understands and acts — where the work happens. Edge-first AI systems for industrial vision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#eeeff1] text-[#0d121a] font-sans antialiased selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
