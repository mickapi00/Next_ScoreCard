"use client";
import React, { use, useState } from "react";
import { ScoreTotal } from "@/components/ui/ScoreTotal";
import { ScoreButtons } from "@/components/ui/ScoreButtons";
import { ScorecardTable } from "@/components/ui/ScorecardTable";
import { cn } from "@/lib/utils";

// Importing styles for the scorecard
import "@/app/styles/scorecardStyle.css";

export default function ScorecardPage() {
  const [scores, setScores] = useState<{ front: string[]; back: string[] }>({
    front: Array(9).fill(""),
    back: Array(9).fill(""),
  });

  const pars = [4, 5, 3, 4, 4, 3, 5, 4, 4];

  const handleScoreChange = (
    nine: "front" | "back",
    index: number,
    value: string
  ) => {
    const newScores = { ...scores };
    newScores[nine][index] = value;
    setScores(newScores);
  };

  const calculateNineTotal = (nine: "front" | "back") =>
    scores[nine].reduce((sum, val) => sum + (parseInt(val) || 0), 0);

  const calculateTotalScore = () =>
    calculateNineTotal("front") + calculateNineTotal("back");

  return (
    <div className="scorecard-container">
      <ScorecardTable
        title="OUT"
        startHole={1}
        pars={pars}
        scores={scores.front}
        onScoreChange={(i, v) => handleScoreChange("front", i, v)}
        total={calculateNineTotal("front")}
      />

      <ScorecardTable
        title="IN"
        startHole={10}
        pars={pars}
        scores={scores.back}
        onScoreChange={(i, v) => handleScoreChange("back", i, v)}
        total={calculateNineTotal("back")}
      />
      <ScoreTotal total={calculateTotalScore()} />
      <ScoreButtons />
    </div>
  );
}
