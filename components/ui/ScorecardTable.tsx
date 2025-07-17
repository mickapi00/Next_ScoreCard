import * as React from "react";
import clsx from "clsx";
import { MarkerDetailsInterface } from "@/app/@type/Markers.Details";
import { MarkersInterface } from "@/app/@type/Markers.Interface";

// Simple cn utility function
// const cn = (...classes: (string | undefined)[]) => {
//   return classes.filter(Boolean).join(" ");
// };

export interface ScorecardTableProps {
  title: string;
  startHole: number;
  pars: number[];
  scores: string[];
  total: number;
  handicaps: number[];

  onScoreChange: (index: number, value: string) => void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Modern Input component
export const Inputprop = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "flex h-8 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm",
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

// Modern ScorecardTable component
export const ScorecardTable = React.forwardRef<
  HTMLDivElement,
  ScorecardTableProps
>(
  (
    { title, startHole, scores, total, pars, handicaps, onScoreChange },
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

        <div className="scorecard-row par-row">
          <div className="scorecard-cell">PAR</div>
          {pars.map((par, index) => (
            <div key={index} className="scorecard-cell">
              {par}
            </div>
          ))}
          <div className="scorecard-cell"> 36 </div>
        </div>

        <div className="scorecard-row par-row">
          <div className="scorecard-cell"> Handicap </div>
          {handicaps.map((handicap, index) => (
            <div key={index} className="scorecard-cell">
              {handicap}
            </div>
          ))}
          <div className="scorecard-cell"> - </div>
        </div>

        <div className="scorecard-row score-section">
          <div className="scorecard-cell">SCORE</div>
          {scores.map((score, index) => (
            <div key={index} className="scorecard-cell">
              <input
                type="number"
                className="score-input"
                value={score}
                onChange={(e) => onScoreChange(index, e.target.value)}
                min="1"
                max="15"
                placeholder="0"
              />
            </div>
          ))}
          <div className="scorecard-cell">{total || ""}</div>
        </div>
      </div>
    );
  }
);

export default ScorecardTable;
