"use client";
import { CoursesInterface } from "../@type/Courses.Interface";
import { LayoutsInterface } from "../@type/Layouts.Interface";
import { MarkersInterface } from "../@type/Markers.Interface";
import { ScorecardInterface } from "../@type/ScoreCard.Interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCourses = async (): Promise<CoursesInterface[]> => {
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

export const fetchLayouts = async (
  courseId: string
): Promise<LayoutsInterface[]> => {
  const res = await fetch(`${API_URL}/coursesLayout/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch Layout");
  return res.json();
};

export const fetchMarkers = async (
  courselayoutId: string
): Promise<MarkersInterface[]> => {
  const res = await fetch(
    `${API_URL}/markers/courseLayoutId/${courselayoutId}`
  );
  if (!res.ok) throw new Error("Failed to fetch markers");
  return res.json();
};

export const fetchMarkerByMarkersId = async (
  markerId: string
): Promise<MarkersInterface[]> => {
  const res = await fetch(`${API_URL}/markers/markerId/${markerId}`);
  if (!res.ok) throw new Error(`Failed to fetch marker with ID ${markerId}`);
  return res.json();
};

export const fetchMarkerId = async (
  markerFront: string,
  markerBack: string
): Promise<MarkersInterface[]> => {
  const params = new URLSearchParams({
    markerFront,
    markerBack,
  });

  const res = await fetch(`${API_URL}/markers/pair?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch markers`);
  return res.json();
};

export const postScorecard = async (
  scorecardData: ScorecardInterface
): Promise<ScorecardInterface> => {
  const res = await fetch(`${API_URL}/posting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scorecardData),
  });

  if (!res.ok) {
    throw new Error("Failed to post scorecard");
  }

  return res.json();
};
