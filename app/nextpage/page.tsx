"use client";
import React, { useState, useEffect } from "react";
import { ScoreTotal } from "@/components/ui/ScoreTotal";
import { ScoreButtons } from "@/components/ui/ScoreButtons";
import { ScorecardTable } from "@/components/ui/ScorecardTable";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Importing styles for the scorecard
import "@/app/styles/scorecardStyle.css";
import { fetchMarkerByMarkersId } from "../services/scorecard.service";
import { MarkersInterface } from "../@type/Markers.Interface";
import { log } from "console";

export default function ScorecardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const layoutFront = searchParams.get("layoutfront");
  const layoutBack = searchParams.get("layoutback");
  const markerFront = searchParams.get("markerfront");
  const markerBack = searchParams.get("markerback");
  const date = searchParams.get("date");
  const course = searchParams.get("course");
  const Response = searchParams.get("response");
  const [frontMarkerData, setFrontMarkerData] = useState<MarkersInterface>();
  const [backMarkerData, setBackMarkerData] = useState<MarkersInterface>();
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
  useEffect(() => {
    console.log("Fetching marker data for front and back markers", markerFront);
    const load = async () => {
      try {
        if (markerFront) {
          const frontData = await fetchMarkerByMarkersId(markerFront);
          setFrontMarkerData(frontData);
        }
        if (markerBack) {
          const backData = await fetchMarkerByMarkersId(markerBack);
          setBackMarkerData(backData);
        }
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };
    load();
  }, [markerFront, markerBack]); // ✅ ต้องใส่ dependency array!);

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
