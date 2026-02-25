import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/AppProviders";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    <html lang="id" className={interTight.variable} suppressHydrationWarning>
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
        className="font-sans antialiased bg-[#F6F6F7] text-[#111827] dark:bg-[#151922] dark:text-white"
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
