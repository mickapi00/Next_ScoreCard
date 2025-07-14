import * as React from "react";

// Optional utility ถ้าไม่มีอยู่แล้วในโปรเจกต์
// const cn = (...classes: (string | undefined)[]) => {
//   return classes.filter(Boolean).join(" ");
// };

export interface ScoreTotalProps {
  total: number;
  className?: string;
}

export const ScoreTotal = ({ total }: ScoreTotalProps) => {
  return (
    <div className={"scorecard-table"}>
      <div className="scorecard-row total-section">
        <div className="scorecard-cell">TOTAL SCORE</div>
        <div
          className="scorecard-cell total-score"
          style={{ flex: 1, textAlign: "right", paddingRight: "16px" }}
        >
          {total}
        </div>
      </div>
    </div>
  );
};
export default ScoreTotal;
