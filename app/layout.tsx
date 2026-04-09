import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { JWT } from "google-auth-library";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import "./globals.css";
import {
  GoogleSpreadsheetContext,
  SerializableRowData,
} from "@/providers/GoogleWorksheetContext";

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

// https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

console.log("process.env.GOOGLE_PRIVATE_KEY", process.env.GOOGLE_PRIVATE_KEY);
const jwtFromEnv = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

const lithiaSalesRepresentativeSpreadsheet = process.env
  .LITHIA_SALES_REPRESENTATIVE_SHEET_ID
  ? new GoogleSpreadsheet(
      process.env.LITHIA_SALES_REPRESENTATIVE_SHEET_ID,
      jwtFromEnv,
    )
  : "";

console.log(
  "lithiaSalesRepresentativeSpreadsheet",
  lithiaSalesRepresentativeSpreadsheet,
);

let rows: GoogleSpreadsheetRow[];
let serializableRowData: SerializableRowData;
if (lithiaSalesRepresentativeSpreadsheet) {
  await lithiaSalesRepresentativeSpreadsheet.loadInfo();
  const worksheet = lithiaSalesRepresentativeSpreadsheet.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  rows = await worksheet.getRows();
  console.log("rows", rows);
  serializableRowData = rows.map((row) => {
    const promptTitle = row.get("prompt_title");
    const promptSubtitle = row.get("prompt_subtitle");
    const prompt = row.get("prompt");
    const answerLine1 = row.get("answer_line_1");
    const answerLine2 = row.get("answer_line_2");
    const answerLine3 = row.get("answer_line_3");
    const answerLine4 = row.get("answer_line_4");
    const answerLine5 = row.get("answer_line_5");
    const answerLine6 = row.get("answer_line_6");
    const answerLine7 = row.get("answer_line_7");
    const answerLine8 = row.get("answer_line_8");

    return {
      promptTitle,
      promptSubtitle,
      prompt,
      answerLine1,
      answerLine2,
      answerLine3,
      answerLine4,
      answerLine5,
      answerLine6,
      answerLine7,
      answerLine8,
    };
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col items-center justify-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleSpreadsheetContext value={serializableRowData}>
            {children}
          </GoogleSpreadsheetContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
