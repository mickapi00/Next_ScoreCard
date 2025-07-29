"use client";

import * as React from "react";

export const ScorecardLegend = () => {
  const legendItems = [
    { label: "Birdie or Better (<-1)", color: "#dcfce7" },
    { label: "Par (0)", color: "#eff6ff" },
    { label: "Bogey (+1)", color: "#fef3c7" },
    { label: "Double Bogey (+2)", color: "#fed7aa" },
    { label: "Triple Bogey or More ", color: "#fecaca" },
  ];

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: "16px",
          fontWeight: "600",
          color: "#374151",
        }}
      >
        Score Legend Identify
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "8px",
        }}
      >
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                marginRight: "8px",
                flexShrink: 0,
              }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScorecardLegend;
