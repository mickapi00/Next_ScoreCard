"use client";
import React from "react";
import "@/app/styles/descriptionStyle.css";

export interface CourseDescriptionHeaderProps {
  courseName: string;
  date: any;
  layoutFront: any;
  layoutBack: any;
  markerColorFront: string;
  markerColorBack: string;
}

export const CourseDescriptionHeader = React.forwardRef<
  HTMLDivElement,
  CourseDescriptionHeaderProps
>(
  (
    {
      courseName,
      date,
      layoutFront,
      layoutBack,
      markerColorFront,
      markerColorBack,
    },
    ref
  ) => {
    return (
      <div className="course-header" ref={ref}>
        <div className="course-header-top">
          <div className="course-info">
            <h1 className="course-title">{courseName}</h1>

            <div className="course-meta">
              {(layoutFront || layoutBack) && (
                <div
                  className="meta-item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  <span>
                    {layoutFront && `Front: ${layoutFront}`}
                    {layoutFront && layoutBack && " • "}
                    {layoutBack && `Back: ${layoutBack}`}
                  </span>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {markerColorFront && (
                      <button
                        className="marker-color-button"
                        style={{
                          backgroundColor: markerColorFront,
                          color: "#222222",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.4rem 0.8rem",
                          fontWeight: "bold",
                          cursor: "default",
                        }}
                        disabled
                      >
                        Front Tee
                      </button>
                    )}

                    {markerColorBack && (
                      <button
                        className="marker-color-button"
                        style={{
                          backgroundColor: markerColorBack,
                          color: "#222222",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.4rem 0.8rem",
                          fontWeight: "bold",
                          cursor: "default",
                        }}
                        disabled
                      >
                        Back Tee
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="course-header-divider"></div>
      </div>
    );
  }
);
