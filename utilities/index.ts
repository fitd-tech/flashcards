import { SerializableRow } from "@/types";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function shuffleGoogleSpreadsheetRows(
  spreadsheet: "" | GoogleSpreadsheet,
) {
  function shuffle(array: SerializableRow[]) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (spreadsheet) {
    const worksheet = spreadsheet.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    const rows = await worksheet.getRows();
    console.log("rows", rows);
    const orderedSerializableRowData = rows.map((row) => {
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
    return shuffle(orderedSerializableRowData);
  }
}
