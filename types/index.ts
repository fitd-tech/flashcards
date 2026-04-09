export type SerializableRow = Record<string, string>;
export type SerializableRowData = SerializableRow[];
export type GoogleSpreadSheetContextValue = {
  loading: boolean;
  refresh: () => void;
  data: SerializableRow[] | null | undefined;
};
