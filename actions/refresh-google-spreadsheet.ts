import { shuffleGoogleSpreadsheetRows } from "@/utilities";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function refreshGoogleSpreadsheet(
  spreadsheet: "" | GoogleSpreadsheet,
) {
  if (spreadsheet) {
    await spreadsheet.loadInfo();
    const shuffledSpreadsheet = shuffleGoogleSpreadsheetRows(spreadsheet);
    return shuffledSpreadsheet;
  }
}
