"use client";
import React, { useState, useEffect } from "react";
import { ScoreTotal } from "@/components/ui/ScoreTotal";
import { ScorecardTable } from "@/components/ui/ScorecardTable";
import { CourseDescriptionHeader } from "@/components/ui/CourseDescriptionHeader";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { postScorecard } from "../services/scorecard.service";
import "@/app/styles/selectedStyle.css";
import "@/app/styles/scorecardStyle.css";
import "@/app/styles/descriptionStyle.css";

// Importing styles for the scorecard
import { fetchMarkerByMarkersId } from "../services/scorecard.service";
import { MarkersInterface } from "../@type/Markers.Interface";
import { MarkerDetailsInterface } from "../@type/Markers.Details";
import { ScoreInterface } from "../@type/Score.Interface";
import { ScorecardInterface } from "../@type/ScoreCard.Interface";
import { fetchMarkerId } from "../services/scorecard.service";
import ScorecardLegend from "@/components/ui/ScorecardLegend";

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

  const [frontlayouts, setFrontlayouts] = useState<string | null>(null);
  const [backlayouts, setBacklayouts] = useState<string | null>(null);
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

  // ฟังก์ชันเช็คว่ากรอกครบทุกช่องหรือไม่
  const isAllScoresFilled = (): boolean => {
    // เช็ค front 9 holes
    const frontFilled = scores.front.every((score, index) => {
      return index < frontDetails.length ? score.trim() !== "" : true;
    });

    // เช็ค back 9 holes
    const backFilled = scores.back.every((score, index) => {
      return index < backDetails.length ? score.trim() !== "" : true;
    });

    return frontFilled && backFilled;
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
            markerData.courseLayoutId === markerFront ||
            markerData.courseName === markerFront
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
            markerData.courseLayoutId === markerBack ||
            markerData.courseName === markerBack
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

  // Remove these functions from here since they're now in the ScorecardTable component
  // const getScoreBackground = (score: string, par: number) => { ... }
  // const getScoreClass = (scoreStr: string, par: number): string => { ... }

  const handleSubmit = async () => {
    // เช็คว่ากรอกครบหรือไม่ก่อน submit
    if (!isAllScoresFilled()) {
      alert("กรุณากรอกคะแนนให้ครบทุกหลุม");
      return;
    }

    const allScores: ScoreInterface[] = [];

    frontDetails.forEach((detail, index) => {
      const scoreStr = scores.front[index];
      if (scoreStr !== "") {
        allScores.push({
          holes: detail.holeNo,
          score: parseInt(scoreStr),
        });
      }
    });

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

    try {
      setScorecardData(scorecard); // update state
      const result = await postScorecard(scorecard); // post to backend
      console.log("Scorecard posted:", result);
      alert("Scorecard submitted successfully!");

      router.push("/");
    } catch (error) {
      console.error("Error submitting scorecard:", error);
      alert("Failed to submit scorecard");
    }
  };

  return (
    <div className="scorecard-container">
      <CourseDescriptionHeader
        courseName={
          frontMarkerData?.courseName ||
          backMarkerData?.courseName ||
          "Golf Course"
        }
        date={date}
        layoutFront={layoutFront}
        layoutBack={layoutBack}
        markerColorFront={frontMarkerData?.colorCode || "#CCCCCC"}
        markerColorBack={backMarkerData?.colorCode || "#CCCCCC"}
      />
      <ScorecardLegend />

      <ScorecardTable
        title="OUT"
        startHole={1}
        pars={frontDetails.map((d) => d.parNo)}
        handicaps={frontDetails.map((d) => d.handicap)}
        scores={scores.front}
        nine="front" // Added this prop
        onScoreChange={handleScoreChange} // Updated to use the correct signature
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
        nine="back" // Added this prop
        onScoreChange={handleScoreChange} // Updated to use the correct signature
        total={calculateNineTotal("back")}
        halfscore={calculateNineTotal("back")}
        totalpar={backPars}
      />

      <ScoreTotal total={calculateTotalScore()} />
      {/* <ScoreButtons scorecardData = {scores} /> */}

      <button
        className={`submit ${!isAllScoresFilled() ? "disabled" : ""}`}
        onClick={handleSubmit}
        disabled={!isAllScoresFilled()}
        style={{
          opacity: isAllScoresFilled() ? 1 : 0.5,
          cursor: isAllScoresFilled() ? "pointer" : "not-allowed",
        }}
      >
        Submit Score
      </button>

      <div className="progress-info">
        2 of 2
        <div className="progress-bar">
          <div className="progress-full"></div>
        </div>
      </div>
    </div>
  );
}
