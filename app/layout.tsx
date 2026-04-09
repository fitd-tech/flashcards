import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { GoogleSpreadsheetContextProvider } from "@/providers/GoogleWorksheetContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flashcards",
  description: "A simple flashcards consumer for Google Sheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-dvh max-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="h-dvh max-h-dvh min-h-dvh flex flex-col items-center justify-center pt-2 pb-2">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleSpreadsheetContextProvider>
            {children}
          </GoogleSpreadsheetContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
