import { ScoreInterface } from "./Score.Interface";

export interface ScorecardInterface {
  courseName: string;
  totalScore: number;
  totalIn: number;
  totalOut: number;
  score: ScoreInterface[];
}
