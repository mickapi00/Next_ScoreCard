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
import { ScoreInterface } from "../@type/Score.Interface";
import { ScorecardInterface } from "../@type/ScoreCard.Interface";
import { fetchMarkerId } from "../services/scorecard.service";

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
  const [scorecardData, setScorecardData] = useState<ScorecardInterface | null>(
    null
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
      // ต้องมีทั้งคู่ถึงจะ fetch
      if (!markerFront || !markerBack) return;

      try {
        // เรียก API ครั้งเดียวด้วยทั้งสอง ID
        const allData = await fetchMarkerId(markerFront, markerBack);

        // แยกข้อมูลตาม ID
        allData.forEach((markerData) => {
          if (
            markerData.markersId === markerFront ||
            markerData.courseLayoutId === markerFront
          ) {
            setFrontMarkerData(markerData);
            setFrontDetails(markerData.markerDetails || []);
            if (markerData.totalPar) {
              setFrontPars(markerData.totalPar);
              console.log("Front", markerData);
            }
          }

          if (
            markerData.markersId === markerBack ||
            markerData.courseLayoutId === markerBack
          ) {
            setBackMarkerData(markerData);
            setBackDetails(markerData.markerDetails || []);
            if (markerData.totalPar) {
              setBackPars(markerData.totalPar);
              console.log("Back", markerData);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    load();
  }, [markerFront, markerBack]);

  const calculateNineTotal = (nine: "front" | "back") =>
    scores[nine].reduce((sum, val) => sum + (parseInt(val) || 0), 0);

  const calculateTotalScore = () =>
    calculateNineTotal("front") + calculateNineTotal("back");
  const test = () => {
    console.log();
  };

  const handleSubmit = () => {
    const allScores: ScoreInterface[] = [];

    // รวมข้อมูลจากหลุม 1–9 (front)
    frontDetails.forEach((detail, index) => {
      const scoreStr = scores.front[index];
      console.log(scoreStr);
      if (scoreStr !== "") {
        allScores.push({
          holes: detail.holeNo,
          score: parseInt(scoreStr),
        });
      }
    });

    // รวมข้อมูลจากหลุม 10–18 (back)
    backDetails.forEach((detail, index) => {
      const scoreStr = scores.back[index];
      if (scoreStr !== "") {
        allScores.push({
          holes: detail.holeNo,
          score: parseInt(scoreStr),
        });
      }
    });

    const scorecard: ScorecardInterface = {
      courseName: course || "Unknown Course",
      totalScore: calculateTotalScore(),
      totalIn: calculateNineTotal("back"),
      totalOut: calculateNineTotal("front"),
      score: allScores,
    };
    setScorecardData(scorecard);
    console.log("Submitting Scorecard:", setScorecardData);
  };

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
      {/* <ScoreButtons scorecardData = {scores} /> */}

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
        onClick={handleSubmit}
      >
        {" "}
        Generate Scorecard{" "}
      </button>

      {scorecardData && <ScoreButtons scorecardData={scorecardData} />}
    </div>
  );
}
