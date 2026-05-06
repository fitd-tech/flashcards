"use client";

import MenuItem from "@/components/menu-item";
import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import { TypographyH1 } from "@/components/ui/typography";
import { decks } from "@/utilities/constants";
import Link from "next/link";

const menuDecks = [
  "sales-representative",
  "andy-elliott-objections",
  "vehicle-specs",
];

export default function Home() {
  return (
    <>
      <ThemeModeToggle className="absolute top-2 right-2 cursor-pointer" />
      <TypographyH1 className="mb-10">Flashcards</TypographyH1>
      <MenuItem menuDeck={menuDecks[0]}>
        <Link href={`/deck/${menuDecks[0]}`} className="mb-2">
          <Button>{`${decks[menuDecks[0]].title}`}</Button>
        </Link>
      </MenuItem>
      <MenuItem menuDeck={menuDecks[1]}>
        <Link href={`/deck/${menuDecks[1]}`} className="mb-2">
          <Button>{`${decks[menuDecks[1]].title}`}</Button>
        </Link>
      </MenuItem>
      <MenuItem menuDeck={menuDecks[2]}>
        <Link href={`/deck/${menuDecks[2]}`} className="mb-2">
          <Button>{`${decks[menuDecks[2]].title}`}</Button>
        </Link>
      </MenuItem>
    </>
  );
}
