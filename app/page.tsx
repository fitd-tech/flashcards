"use client";

import { useState, useEffect } from "react";

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
    title: "2026 Colorado",
    subtitle: "Some information",
    prompt: "Engine",
    answer: "Some engine",
  },
  {
    id: 2,
    title: "2025 Tahoe",
    subtitle: "Some other information",
    prompt: "Trunk space",
    answer: "A lot",
  },
  {
    id: 3,
    title: "2026 Equinox",
    subtitle: "More information",
    prompt: "Engine size",
    answer: "woah",
  },
];

const FRONT = "front";
const BACK = "back";

export default function Home() {
  const [currentCardId, setCurrentCardId] = useState(1);
  const [currentSide, setCurrentSide] = useState(FRONT);

  function handleGoBack() {
    setCurrentSide(FRONT);
    setCurrentCardId((previous) => {
      if (previous === 1) {
        return cards.length;
      }
      return previous - 1;
    });
  }

  function handleGoForward() {
    setCurrentSide(FRONT);
    setCurrentCardId((previous) => {
      if (previous === cards.length) {
        return 1;
      }
      return previous + 1;
    });
  }

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
  }, []);

  const currentCard: Card =
    cards.find((card) => card.id === currentCardId) || cards[0];
  const frontOfCard = (
    <>
      <div className="text-3xl font-bold select-none">{currentCard.title}</div>
      <div className="text-xl font-semibold select-none">
        {currentCard.subtitle}
      </div>
      <div className="select-none">{currentCard.prompt}</div>
    </>
  );
  const backOfCard = <div className="select-none">{currentCard.answer}</div>;

  return (
    <div className="flex gap-4 justify-center items-center w-full">
      <div
        onClick={handleGoBack}
        className="text-6xl cursor-pointer select-none"
      >
        &lt;
      </div>
      <div
        onClick={handleFlipCard}
        className="flex flex-col items-center justify-center w-1/3 min-h-60 rounded-lg border border-blue-400"
      >
        {currentSide === FRONT ? frontOfCard : backOfCard}
      </div>
      <div
        onClick={handleGoForward}
        className="text-6xl cursor-pointer select-none"
      >
        &gt;
      </div>
    </div>
  );
}
