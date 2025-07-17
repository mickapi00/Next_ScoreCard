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
import { MarkerDetailsInterface } from "../@type/Markers.Details";
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
  const response = searchParams.get("response");

  const [frontMarkerData, setFrontMarkerData] = useState<MarkersInterface>();
  const [backMarkerData, setBackMarkerData] = useState<MarkersInterface>();
  const [frontDetails, setFrontDetails] = useState<MarkerDetailsInterface[]>(
    []
  );
  const [backDetails, setBackDetails] = useState<MarkerDetailsInterface[]>([]);
  const [scores, setScores] = useState<{ front: string[]; back: string[] }>({
    front: Array(9).fill(""),
    back: Array(9).fill(""),
  });

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
    const load = async () => {
      console.log("Fetching marker data", markerFront, markerBack);

      if (markerFront) {
        const frontDataArray = await fetchMarkerByMarkersId(markerFront);
        const frontData = frontDataArray[0];
        setFrontMarkerData(frontData);
        if (frontData.markerDetails) {
          const details = frontData.markerDetails;
          setFrontDetails(details);
          console.log("Front 9:", details);
        } else {
          setFrontDetails([]);
        }
      }

      if (markerBack) {
        const backDataArray = await fetchMarkerByMarkersId(markerBack);
        const backData = backDataArray[0];
        setBackMarkerData(backData);
        if (backData.markerDetails) {
          const details = backData.markerDetails;
          setBackDetails(details);
          console.log("Back 9:", details);
        } else {
          setBackDetails([]);
        }
      }
    };

    load();
  }, [markerFront, markerBack]);

  const calculateNineTotal = (nine: "front" | "back") =>
    scores[nine].reduce((sum, val) => sum + (parseInt(val) || 0), 0);

  const calculateTotalScore = () =>
    calculateNineTotal("front") + calculateNineTotal("back");

  return (
    <div className="scorecard-container">
      <ScorecardTable
        title="OUT"
        startHole={1}
        pars={frontDetails.map((d) => d.parNo)}
        handicaps={frontDetails.map((d) => d.handicap)}
        scores={scores.front}
        onScoreChange={(i, v) => handleScoreChange("front", i, v)}
        total={calculateNineTotal("front")}
      />

      <ScorecardTable
        title="IN"
        startHole={10}
        pars={backDetails.map((d) => d.parNo)}
        handicaps={backDetails.map((d) => d.handicap)}
        scores={scores.back}
        onScoreChange={(i, v) => handleScoreChange("back", i, v)}
        total={calculateNineTotal("back")}
      />

      <ScoreTotal total={calculateTotalScore()} />
      <ScoreButtons />
    </div>
  );
}
