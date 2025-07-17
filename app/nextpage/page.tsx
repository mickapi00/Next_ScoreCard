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
  const [frontPars, setFrontPars] = useState<number>(0);
  const [backPars, setBackPars] = useState<number>(0);
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
      if (markerFront) {
        const frontDataArray = await fetchMarkerByMarkersId(markerFront);
        const frontData = frontDataArray[0];
        setFrontMarkerData(frontData);

        if (frontData.markerDetails) {
          const details = frontData.markerDetails;
          setFrontDetails(details);
        } else {
          setFrontDetails([]);
        }

        if (frontData.totalPar) {
          const Pars = frontData.totalPar;
          setFrontPars(Pars);
          console.log("This is pars ", frontPars);
        }
      }

      if (markerBack) {
        const backDataArray = await fetchMarkerByMarkersId(markerBack);
        const backData = backDataArray[0];
        setBackMarkerData(backData);
        if (backData.markerDetails) {
          const details = backData.markerDetails;
          setBackDetails(details);
        } else {
          setBackDetails([]);
        }
        if (backData.totalPar) {
          const Pars = backData.totalPar;
          setBackPars(Pars);
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
        halfscore={calculateNineTotal("front")}
        totalpar={frontPars}
      />

      <ScorecardTable
        title="IN"
        startHole={10}
        pars={backDetails.map((d) => d.parNo)}
        handicaps={backDetails.map((d) => d.handicap)}
        scores={scores.back}
        onScoreChange={(i, v) => handleScoreChange("back", i, v)}
        total={calculateNineTotal("back")}
        halfscore={calculateNineTotal("back")}
        totalpar={backPars}
      />

      <ScoreTotal total={calculateTotalScore()} />
      <ScoreButtons />
    </div>
  );
}
