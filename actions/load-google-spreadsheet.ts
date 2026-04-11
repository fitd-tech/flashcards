"use server";

import { SerializableRow } from "@/types";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { refreshGoogleSpreadsheet } from "./refresh-google-spreadsheet";
import { spreadsheetSlugToEnvVar } from "@/utilities/constants";
import { shuffleGoogleSpreadsheetRows } from "@/utilities";

// https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const jwtFromEnv = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : process.env.GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

export async function loadGoogleSpreadsheet(
  spreadsheetSlug?: keyof typeof spreadsheetSlugToEnvVar,
) {
  const spreadsheetId = spreadsheetSlug
    ? process.env[spreadsheetSlugToEnvVar[spreadsheetSlug]]
    : null;
  const lithiaSalesRepresentativeSpreadsheet = spreadsheetId
    ? new GoogleSpreadsheet(spreadsheetId, jwtFromEnv)
    : null;

  console.log(
    "lithiaSalesRepresentativeSpreadsheet",
    lithiaSalesRepresentativeSpreadsheet,
  );

  let spreadsheet;
  if (lithiaSalesRepresentativeSpreadsheet) {
    await lithiaSalesRepresentativeSpreadsheet.loadInfo();
    spreadsheet = shuffleGoogleSpreadsheetRows(
      lithiaSalesRepresentativeSpreadsheet,
    );
  }

  return spreadsheet;
}
