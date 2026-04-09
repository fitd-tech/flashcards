"use client";

import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { createContext } from "react";

export type SerializableRow = Record<string, string>;
export type SerializableRowData = SerializableRow[];

export const GoogleSpreadsheetContext =
  createContext<SerializableRowData | null>(null);
