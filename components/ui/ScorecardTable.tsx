import * as React from "react";
import clsx from "clsx";

export interface ScorecardTableProps {
  title: string;
  startHole: number;
  pars: number[];
  scores: string[];
  total: number;
  handicaps: number[];
  halfscore: number;
  totalpar: number;
  nine: "front" | "back";
  onScoreChange: (nine: "front" | "back", index: number, value: string) => void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Inputprop = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "flex h-8 w-full rounded-md border border-gray-500 bg-white px-2 py-1 text-sm text-center mr-2",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Inputprop.displayName = "Inputprop";

const getScoreBackgroundColor = (score: string, par: number) => {
  if (score === "" || isNaN(parseInt(score))) {
    return "#f9fafb"; // Default background
  }

  const scoreNum = parseInt(score);
  const diff = scoreNum - par;

  if (diff <= -1) {
    return "#dcfce7"; // Birdie - light green
  } else if (diff === 0) {
    return "#eff6ff"; // Par - light blue
  } else if (diff === 1) {
    return "#fef3c7"; // Bogey - light yellow
  } else if (diff === 2) {
    return "#fed7aa"; // Double bogey - light orange
  } else {
    return "#fecaca"; // Triple bogey or worse - light red
  }
};

export const ScorecardTable = React.forwardRef<
  HTMLDivElement,
  ScorecardTableProps
>(
  (
    {
      title,
      startHole,
      scores,
      totalpar,
      pars,
      handicaps,
      halfscore,
      nine,
      onScoreChange,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="scorecard-table">
        {/* Header Row */}
        <div className="scorecard-row header-row">
          <div className="scorecard-cell">HOLE</div>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="scorecard-cell">
              {startHole + i}
            </div>
          ))}
          <div className="scorecard-cell">{title}</div>
        </div>

        {/* PAR Row */}
        <div className="scorecard-row par-row">
          <div className="scorecard-cell">PAR</div>
          {pars.map((par, index) => (
            <div key={index} className="scorecard-cell">
              {par}
            </div>
          ))}
          <div className="scorecard-cell">{totalpar}</div>
        </div>

        {/* Handicap Row */}
        <div className="scorecard-row par-row">
          <div className="scorecard-cell">Handicap</div>
          {handicaps.map((handicap, index) => (
            <div key={index} className="scorecard-cell">
              {handicap}
            </div>
          ))}
          <div className="scorecard-cell">-</div>
        </div>

        {/* Score Row */}
        <div className="scorecard-row score-section">
          <div className="scorecard-cell">SCORE</div>
          {scores.map((score, index) => {
            const backgroundColor = getScoreBackgroundColor(score, pars[index]);

            return (
              <div
                key={index}
                className="scorecard-cell"
                style={{
                  backgroundColor: backgroundColor,
                  transition: "background-color 0.2s ease",
                }}
              >
                <input
                  type="number"
                  className="score-input"
                  style={{ backgroundColor: "transparent" }}
                  value={score}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (parseInt(value) >= 1 && parseInt(value) <= 15)
                    ) {
                      onScoreChange(nine, index, value);
                    }
                  }}
                  min="1"
                  max="15"
                  placeholder="0"
                />
              </div>
            );
          })}
          <div className="scorecard-cell">{halfscore}</div>
        </div>
      </div>
    );
  }
);

ScorecardTable.displayName = "ScorecardTable";

export default ScorecardTable;
