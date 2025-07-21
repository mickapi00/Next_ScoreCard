"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fetchCourses } from "./services/scorecard.service";
import { fetchLayouts } from "./services/scorecard.service";
import { fetchMarkers } from "./services/scorecard.service";

import { CoursesInterface } from "./@type/Courses.Interface";
import { LayoutsInterface } from "./@type/Layouts.Interface";
import { MarkersInterface } from "@/app/@type/Markers.Interface";
import { useRouter } from "next/navigation";

export default function ScorecardPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [courses, setCourses] = useState<CoursesInterface[]>([]);
  const [layouts, setLayout] = useState<LayoutsInterface[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [selectedLayoutFront, setselectedLayoutFront] = useState<string>("");
  const [selectedLayoutBack, setselectedLayoutBack] = useState<string>("");
  const [selectedMarkerFront, setSelectedMarkerFront] = useState("");
  const [selectedMarkerBack, setSelectedMarkerBack] = useState("");
  const [markerFrontList, setMarkerFrontList] = useState<MarkersInterface[]>(
    []
  );
  const [markerBackList, setMarkerBackList] = useState<MarkersInterface[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCourses(true);
        const data = await fetchCourses();
        setCourses(data.filter((c) => c.name));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCourses(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    fetchLayouts(selectedCourse).then(setLayout).catch(console.error);
  }, [selectedCourse]);

  useEffect(() => {
    if (!selectedLayoutFront) {
      setMarkerFrontList([]);
      return;
    }

    fetchMarkers(selectedLayoutFront)
      .then((data) => {
        setMarkerFrontList(data);
      })
      .catch((err) => {
        console.error("Error fetching front markers:", err);
        setMarkerFrontList([]);
      });
  }, [selectedLayoutFront]);

  useEffect(() => {
    if (!selectedLayoutBack) {
      setMarkerBackList([]);
    }

    fetchMarkers(selectedLayoutBack)
      .then((data) => {
        setMarkerBackList(data);
      })
      .catch((err) => {
        console.error("Error fetching front markers:", err);
        setMarkerBackList([]);
      });
  }, [selectedLayoutBack]);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      layoutfront: selectedLayoutFront,
      layoutback: selectedLayoutBack,
      markerfront: selectedMarkerFront,
      markerback: selectedMarkerBack,
      date: format(date, "yyyy-MM-dd"),
      course: selectedCourse,
    });
    router.push(`/nextpage?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Scorecard</h1>
        <p className="text-gray-600 text-sm mb-6">
          Store and archive scorecards for future reference.
          <br />
          Access round history for analysis or sharing.
        </p>
        <hr className="w-full border-t border-gray-200 mb-6" />

        <div className="space-y-6">
          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Playing Date
            </Label>
            <Input
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Golf Course
            </Label>
            {loadingCourses ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : (
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Layout Front
            </Label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLayoutFront}
              onChange={(e) => setselectedLayoutFront(e.target.value)}
            >
              <option value="">Select layout (Front)</option>
              {layouts.map((l) => (
                <option key={l.courselayoutId} value={l.courselayoutId}>
                  {l.courselayout}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Layout Back
            </Label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLayoutBack}
              onChange={(e) => setselectedLayoutBack(e.target.value)}
            >
              <option value="">Select layout (Back)</option>
              {layouts.map((l) => (
                <option key={l.courselayoutId} value={l.courselayoutId}>
                  {l.courselayout}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Marker Front
            </Label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMarkerFront}
              onChange={(e) => setSelectedMarkerFront(e.target.value)}
            >
              <option value="">Select marker</option>
              {markerFrontList.map((m) => (
                <option key={m.markersId} value={m.markersId}>
                  {m.color}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Marker Back
            </Label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMarkerBack}
              onChange={(e) => setSelectedMarkerBack(e.target.value)}
            >
              <option value="">Select marker</option>
              {markerBackList.map((m) => (
                <option key={m.markersId} value={m.markersId}>
                  {m.color}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          className="w-full mt-6 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
          disabled={
            !selectedLayoutFront ||
            !selectedLayoutBack ||
            !selectedMarkerFront ||
            !selectedMarkerBack
          }
        >
          Next
        </Button>
        <div className="mt-4 text-center text-gray-500">1 of 2</div>
      </div>
    </div>
  );
}
