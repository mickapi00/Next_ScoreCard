import * as React from "react";
import { Type } from "lucide-react";
import clsx from "clsx";
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
>(({ title, startHole, pars, scores, total, onScoreChange }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white"
      )}
    >
      {/* Header Row */}
      <div className="flex bg-gray-50 border-b border-gray-200">
        <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 border-r border-gray-200">
          HOLE
        </div>
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 text-center border-r border-gray-200"
          >
            {startHole + i}
          </div>
        ))}
        <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 text-center">
          {title}
        </div>
      </div>

      {/* Par Row */}
      <div className="flex bg-gray-50 border-b border-gray-200">
        <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 border-r border-gray-200">
          PAR
        </div>
        {pars.map((par, index) => (
          <div
            key={index}
            className="flex-1 px-3 py-2 text-sm text-gray-900 text-center border-r border-gray-200"
          >
            {par}
          </div>
        ))}
        <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 text-center">
          36
        </div>
      </div>

      {/* Score Row */}
      <div className="flex bg-white">
        <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 border-r border-gray-200">
          SCORE
        </div>
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex-1 px-1 py-2 border-r border-gray-200"
          >
            <Inputprop
              type="number"
              value={score}
              onChange={(e) => onScoreChange(index, e.target.value)}
              min="1"
              max="15"
              className="text-center h-8"
              placeholder="0"
            />
          </div>
        ))}
        <div className="flex-1 px-3 py-2 text-sm font-bold text-gray-900 text-center">
          {total || ""}
        </div>
      </div>
    </div>
  );
});
export default ScorecardTable;
