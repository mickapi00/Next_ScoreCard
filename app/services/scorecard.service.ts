"use client";
import { CoursesInterface } from "../@type/Courses.Interface";
import { LayoutsInterface } from "../@type/Layouts.Interface";
import { MarkersInterface } from "../@type/Markers.Interface";
import { useRouter } from "next/navigation";

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
  const res = await fetch(`${API_URL}/markers/courseLayoutId/${courselayoutId}`
  );
  if (!res.ok) throw new Error("Failed to fetch markers");
  return res.json();
};
