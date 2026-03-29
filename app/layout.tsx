import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* 🔥 EKLENEN FONT */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Merlin Makro",
  description: "Merlin Makro Panel",

  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">

        {/* CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="w-full text-center pb-6 mt-6">
          <div className="w-[300px] mx-auto border-t border-white/20 mb-3"></div>

          <p className="text-gray-400 text-sm">
            © 2026 Merlin Makro • Tüm Hakları Saklıdır.
          </p>
        </footer>

      </body>
    </html>
  );
}