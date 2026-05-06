import { decks } from "@/utilities/constants";
import { ReactNode } from "react";

type MenuItemProps = {
  menuDeck: string;
  children: ReactNode;
};

export default function MenuItem({ menuDeck, children }: MenuItemProps) {
  if (process.env.NODE_ENV === "development") {
    return children;
  }

  if (process.env.NODE_ENV === decks[menuDeck].env) {
    return children;
  }

  return null;
}
