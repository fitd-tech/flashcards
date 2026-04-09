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
import { GoogleSpreadsheetContext } from "@/providers/GoogleWorksheetContextProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCcw } from "lucide-react";
import { SerializableRow } from "@/types";
import { Spinner } from "@/components/ui/spinner";

type Card = {
  id: number;
  title: string;
  subtitle: string;
  prompt: string;
  answer: string;
};

const FRONT = "front";
const BACK = "back";

export default function Home() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentSide, setCurrentSide] = useState(FRONT);

  const {
    loading,
    data: rows,
    refresh,
  } = useContext(GoogleSpreadsheetContext) || {};
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
        <div className="text-2xl font-bold  text-center select-none">
          {currentRow?.promptTitle}
        </div>
      )}
      {currentRow?.promptSubtitle && (
        <div className="text-xl font-semibold  text-center select-none">
          {currentRow?.promptSubtitle}
        </div>
      )}
      {currentRow?.prompt && (
        <div className="text-2xl font-semibold  text-center select-none">
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
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine2}
          </div>
        </>
      )}
      {currentRow?.answerLine3 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine3}
          </div>
        </>
      )}
      {currentRow?.answerLine4 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine4}
          </div>
        </>
      )}
      {currentRow?.answerLine5 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine5}
          </div>
        </>
      )}
      {currentRow?.answerLine6 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine6}
          </div>
        </>
      )}
      {currentRow?.answerLine7 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine7}
          </div>
        </>
      )}
      {currentRow?.answerLine8 && (
        <>
          <div className="select-none">-</div>
          <div className="text-lg text-center select-none">
            {currentRow?.answerLine8}
          </div>
        </>
      )}
    </div>
  );

  function renderCardContent() {
    if (loading) {
      return <Spinner />;
    } else {
      return currentSide === FRONT ? frontOfCard : backOfCard;
    }
  }

  return (
    <div className="flex gap-4 justify-center items-center w-full pl-4 pr-4">
      <Button
        variant="outline"
        size="icon"
        aria-label="Refresh & shuffle"
        onClick={refresh}
        className="absolute top-2 left-2 cursor-pointer"
      >
        <RefreshCcw />
      </Button>
      <ThemeModeToggle className="absolute top-2 right-2 cursor-pointer" />
      <Button
        variant="outline"
        size="icon"
        aria-label="Go back"
        onClick={handleGoBack}
        className="cursor-pointer"
      >
        <ArrowLeftIcon />
      </Button>
      <div className="h-96 max-h-dvh min-h-0 w-dvw md:w-2/3 lg:w-1/2 pt-2 pb-2">
        <Card
          onClick={handleFlipCard}
          className={`flex flex-col items-center justify-center w-full h-full hover:border cursor-pointer p-4 ${currentSide === BACK ? "bg-(--card-back)" : ""}`}
        >
          {renderCardContent()}
        </Card>
      </div>
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
