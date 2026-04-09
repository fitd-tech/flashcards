"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import {
  GoogleSpreadsheetContext,
  SerializableRow,
  SerializableRowData,
} from "@/providers/GoogleWorksheetContext";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

type Card = {
  id: number;
  title: string;
  subtitle: string;
  prompt: string;
  answer: string;
};

const cards: Card[] = [
  {
    id: 1,
    title: "cat",
    subtitle: "",
    prompt: "",
    answer: "meow",
  },
  {
    id: 2,
    title: "dog",
    subtitle: "",
    prompt: "",
    answer: "woof",
  },
  {
    id: 3,
    title: "duck",
    subtitle: "",
    prompt: "",
    answer: "quack",
  },
];

const FRONT = "front";
const BACK = "back";

export default function Home() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentSide, setCurrentSide] = useState(FRONT);

  const rows = useContext(GoogleSpreadsheetContext);
  console.log("rows from context", rows);

  const handleGoBack = useCallback(() => {
    setCurrentSide(FRONT);
    setCurrentRowIndex((previous) => {
      if (!rows) {
        return previous;
      } else if (previous === 0) {
        return rows.length - 1;
      }
      return previous - 1;
    });
  }, [rows]);

  const handleGoForward = useCallback(() => {
    setCurrentSide(FRONT);
    setCurrentRowIndex((previous) => {
      if (!rows) {
        return previous;
      } else if (previous === rows.length - 1) {
        return 0;
      }
      return previous + 1;
    });
  }, [rows]);

  function handleFlipCard() {
    setCurrentSide((previous) => (previous === FRONT ? BACK : FRONT));
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      console.log("e.key from handelKeyDown", e.key);
      if (e.key === "ArrowLeft") {
        handleGoBack();
      } else if (e.key === "ArrowRight") {
        handleGoForward();
      } else if (e.key === " ") {
        handleFlipCard();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGoBack, handleGoForward]);

  const currentRow: SerializableRow | null = rows
    ? rows[currentRowIndex]
    : null;
  const frontOfCard = (
    <>
      {currentRow?.promptTitle && (
        <div className="text-2xl font-bold select-none">
          {currentRow?.promptTitle}
        </div>
      )}
      {currentRow?.promptSubtitle && (
        <div className="text-xl font-semibold select-none">
          {currentRow?.promptSubtitle}
        </div>
      )}
      {currentRow?.prompt && (
        <div className="text-2xl font-semibold select-none">
          {currentRow?.prompt}
        </div>
      )}
    </>
  );
  const backOfCard = (
    <div className="flex flex-col justify-center items-center">
      {currentRow?.answerLine1 && (
        <>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine1}
          </div>
        </>
      )}
      {currentRow?.answerLine2 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine2}
          </div>
        </>
      )}
      {currentRow?.answerLine3 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine3}
          </div>
        </>
      )}
      {currentRow?.answerLine4 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine4}
          </div>
        </>
      )}
      {currentRow?.answerLine5 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine5}
          </div>
        </>
      )}
      {currentRow?.answerLine6 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine6}
          </div>
        </>
      )}
      {currentRow?.answerLine7 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine7}
          </div>
        </>
      )}
      {currentRow?.answerLine8 && (
        <>
          <div>-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine8}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex gap-4 justify-center items-center w-full">
      <ThemeModeToggle className="absolute top-2 right-2" />
      <Button
        variant="outline"
        size="icon"
        aria-label="Go back"
        onClick={handleGoBack}
        className="cursor-pointer"
      >
        <ArrowLeftIcon />
      </Button>
      <Card
        onClick={handleFlipCard}
        className={`flex flex-col items-center justify-center w-1/3 min-h-60 hover:border hover:filter hover:drop-shadow-md hover:drop-shadow-blue-900 cursor-pointer p-4 ${currentSide === BACK ? "bg-(--card-back)" : ""}`}
      >
        {currentSide === FRONT ? frontOfCard : backOfCard}
      </Card>
      <Button
        variant="outline"
        size="icon"
        aria-label="Go forward"
        onClick={handleGoForward}
        className="cursor-pointer"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
