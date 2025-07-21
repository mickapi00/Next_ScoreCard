"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { postScorecard } from "@/app/services/scorecard.service";
import type { ScorecardInterface } from "@/app/@type/ScoreCard.Interface";
import "@/app/styles/selectedStyle.css";

export interface ScoreButtonsProps {
  scorecardData: ScorecardInterface;
}

export const ScoreButtons: React.FC<ScoreButtonsProps> = ({
  scorecardData,
}) => {
  const handlePostScorecard = async () => {
    try {
      const result = await postScorecard(scorecardData);
      console.log("Scorecard posted:", result);
      alert("Scorecard submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit scorecard");
    }
  };

  return (
    <div>
      <Button className="cancel ">Cancel</Button>

      <Button className="post" onClick={handlePostScorecard}>
        Post Score{" "}
      </Button>
    </div>
  );
};
export default ScoreButtons;
