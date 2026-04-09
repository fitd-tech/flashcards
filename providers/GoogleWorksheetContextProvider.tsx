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
  const [loading, setLoading] = useState(false);
  const [serializableRowData, setSerializableRowData] = useState<
    SerializableRow[] | null | undefined
  >(null);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const initialData = await loadAndShuffle();
      setSerializableRowData(initialData);
      setLoading(false);
    }
    loadInitialData();
  }, []);

  async function handleRefresh() {
    setLoading(true);
    const shuffledData = await loadAndShuffle();
    setSerializableRowData(shuffledData);
    setLoading(false);
  }

  return (
    <GoogleSpreadsheetContext
      value={{ loading, data: serializableRowData, refresh: handleRefresh }}
    >
      {children}
    </GoogleSpreadsheetContext>
  );
}
