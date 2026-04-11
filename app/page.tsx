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
      <Link href={`/deck/vehicle-specs`}>
        <Button>Vehicle Specs</Button>
      </Link>
    </>
  );
}
