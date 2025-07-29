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

// ฟังก์ชันสำหรับกำหนดสีตัวอักษรตามสีพื้นหลัง
const getTextColor = (backgroundColor: string): string => {
  const color = backgroundColor.toLowerCase();

  // สีขาวและเหลือง → ใช้ตัวอักษรสีดำ
  if (color === "white" || color === "yellow") {
    return "#333333";
  }

  // สีแดง น้ำเงิน ดำ → ใช้ตัวอักษรสีขาว
  if (color === "red" || color === "blue" || color === "black") {
    return "#ffffff";
  }

  // default สำหรับสีอื่นๆ
  return "#333333";
};

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
                          color: getTextColor(markerColorFront),
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
                          color: getTextColor(markerColorBack),
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
