import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Adibayu Group",
  description: "Advancing Industries. Driving Growth.",
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    localStorage.setItem('theme', 'light');
                    theme = 'light';
                  }
                  document.documentElement.classList.toggle('dark', theme === 'dark');

                  var lang = localStorage.getItem('lang') || localStorage.getItem('locale');
                  if (!lang) {
                    localStorage.setItem('lang', 'id');
                    lang = 'id';
                  }
                  document.documentElement.lang = (lang === 'en' || lang === 'id') ? lang : 'id';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased text-gray-900 bg-white"
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
