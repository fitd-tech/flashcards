"use client";

import { loadAndShuffle } from "@/actions/load-google-spreadsheet";
import { GoogleSpreadSheetContextValue, SerializableRow } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const GoogleSpreadsheetContext = createContext<
  GoogleSpreadSheetContextValue | null | undefined
>(null);

type GoogleSpreadsheetContextProviderProps = {
  children: ReactNode;
};

export function GoogleSpreadsheetContextProvider({
  children,
}: GoogleSpreadsheetContextProviderProps) {
  const [serializableRowData, setSerializableRowData] = useState<
    SerializableRow[] | null | undefined
  >(null);

  useEffect(() => {
    async function loadInitialData() {
      const initialData = await loadAndShuffle();
      setSerializableRowData(initialData);
    }
    loadInitialData();
  }, []);

  async function handleRefresh() {
    const shuffledData = await loadAndShuffle();
    setSerializableRowData(shuffledData);
  }

  return (
    <GoogleSpreadsheetContext
      value={{ data: serializableRowData, refresh: handleRefresh }}
    >
      {children}
    </GoogleSpreadsheetContext>
  );
}
