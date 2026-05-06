export const spreadsheetSlugToEnvVar = {
  "vehicle-specs": "CHEVY_VEHICLE_SPECS_SHEET_ID",
  "sales-representative": "SALES_REPRESENTATIVE_SHEET_ID",
  "andy-elliott-objections": "ANDY_ELLIOTT_OBJECTIONS_SHEET_ID",
};

export enum Env {
  DEV = "development",
  PROD = "production",
}

type Deck = {
  title: string;
  env: string;
};

export const decks: Record<string, Deck> = {
  "sales-representative": {
    title: "Sales Representative",
    env: Env.DEV,
  },
  "andy-elliott-objections": {
    title: "Andy Elliott Objections",
    env: Env.PROD,
  },
  "vehicle-specs": {
    title: "Vehicle Specs",
    env: Env.DEV,
  },
};
