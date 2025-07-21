"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { postScorecard } from "@/app/services/scorecard.service";
import type { ScorecardInterface } from "@/app/@type/ScoreCard.Interface";

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
    <div className="flex gap-4 mt-4 justify-end">
      <Button className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={handlePostScorecard}
      >
        Post Score →
      </Button>
    </div>
  );
};
export default ScoreButtons;
