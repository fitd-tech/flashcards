"use client";

import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import { TypographyH1 } from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ThemeModeToggle className="absolute top-2 right-2 cursor-pointer" />
      <TypographyH1 className="mb-10">Flashcards</TypographyH1>
      <Link href={`/deck/sales-representative`} className="mb-2">
        <Button>Sales Representative</Button>
      </Link>
      <Link href={`/deck/andy-elliott-objections`} className="mb-2">
        <Button>Andy Elliott Objections</Button>
      </Link>
      <Link href={`/deck/vehicle-specs`} className="mb-2">
        <Button>Vehicle Specs</Button>
      </Link>
    </>
  );
}
