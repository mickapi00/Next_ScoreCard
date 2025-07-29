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
import "@/app/styles/selectedStyle.css";
import { Underdog } from "next/font/google";

export default function ScorecardPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [courses, setCourses] = useState<CoursesInterface[]>([]);
  const [layouts, setLayout] = useState<LayoutsInterface[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [selectedLayoutFront, setselectedLayoutFront] = useState<string>("");
  const [selectedLayoutBack, setselectedLayoutBack] = useState<string>("");
  const [selectedMarkerFront, setSelectedMarkerFront] = useState("");
  const [selectedMarkerBack, setSelectedMarkerBack] = useState("");
  const [markerFrontList, setMarkerFrontList] = useState<MarkersInterface[]>(
    []
  );
  const [markerBackList, setMarkerBackList] = useState<MarkersInterface[]>([]);

  const handleSelectcourseId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCourse(selectedValue);
    console.log("Selected courseId:", selectedValue);

    // Reset layout and marker selections when course changes
    setselectedLayoutFront("");
    setselectedLayoutBack("");
    setSelectedMarkerFront("");
    setSelectedMarkerBack("");
    setMarkerFrontList([]);
    setMarkerBackList([]);

    if (selectedValue) {
      fetchLayouts(selectedValue).then(setLayout).catch(console.error);
    } else {
      setLayout([]);
    }
  };

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

  // Fixed useEffect for front markers
  useEffect(() => {
    // Clear markers first
    setMarkerFrontList([]);
    console.log("hello", selectedLayoutFront);

    // Only fetch if a layout is selected (not empty)
    if (selectedLayoutFront === "" || !selectedLayoutFront) {
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

  // Fixed useEffect for back markers
  useEffect(() => {
    // Clear markers first
    setMarkerBackList([]);

    // Only fetch if a layout is selected (not empty)
    if (selectedLayoutBack === "" || !selectedLayoutBack) {
      return;
    }

    fetchMarkers(selectedLayoutBack)
      .then((data) => {
        setMarkerBackList(data);
      })
      .catch((err) => {
        console.error("Error fetching back markers:", err);
        setMarkerBackList([]);
      });
  }, [selectedLayoutBack]);

  const handleSubmit = () => {
    if (!selectedCourse) return;
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
    <div className="container">
      <h1 className="h1">Scorecard System</h1>
      <hr className="hr" />

      <div className="form-group">
        <Label className="label">Playing Date</Label>
        <Input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="input"
        />
      </div>

      <div className="form-group">
        <Label className="label">Golf Course</Label>
        {loadingCourses ? (
          <div className="loading">Loading...</div>
        ) : (
          <select
            className="select"
            value={selectedCourse || ""}
            onChange={handleSelectcourseId}
          >
            <option value="">Select an option</option>
            {courses.map((c) => (
              <option key={c.courseId} value={c.courseId}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-group">
        <Label className="label">Layout Front</Label>
        <select
          className="select"
          value={selectedLayoutFront}
          onChange={(e) => setselectedLayoutFront(e.target.value)}
        >
          <option value="">Select an option</option>
          {layouts.map((l) => (
            <option key={l.courselayoutId} value={l.courselayoutId}>
              {l.courselayout}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <Label className="label">Layout Back</Label>
        <select
          className="select"
          value={selectedLayoutBack}
          onChange={(e) => setselectedLayoutBack(e.target.value)}
        >
          <option value="">Select an option</option>
          {layouts.map((l) => (
            <option key={l.courselayoutId} value={l.courselayoutId}>
              {l.courselayout}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <Label className="label">Marker Front</Label>
        <select
          className="select"
          value={selectedMarkerFront}
          onChange={(e) => setSelectedMarkerFront(e.target.value)}
        >
          <option value="">Select an option</option>
          {markerFrontList.map((m) => (
            <option key={m.markersId} value={m.markersId}>
              {m.color}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <Label className="label">Marker Back</Label>
        <select
          className="select"
          value={selectedMarkerBack}
          onChange={(e) => setSelectedMarkerBack(e.target.value)}
        >
          <option value="">Select an option</option>
          {markerBackList.map((m) => (
            <option key={m.markersId} value={m.markersId}>
              {m.color}
            </option>
          ))}
        </select>
      </div>

      <Button
        className="button"
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
      <div className="progress-info">
        1 of 2
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
