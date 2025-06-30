"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function ScorecardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [courses, setCourses] = useState<string[]>([]);
  const [teeBoxes, setTeeBoxes] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTee, setSelectedTee] = useState<string>("");
  const [marker, setMarker] = useState<string>("");

 useEffect(() => {
  fetch("http://localhost:8080/api/courses")
    .then((res) => res.json())
    .then((data: any[]) => setCourses(data)) // ต้องแปลงให้เป็น array ของ object
    .catch(console.error);
}, []);

useEffect(() => {
  if (!selectedCourse) return;

  // ดึง tee box layout ตาม courseId
  fetch(`http://localhost:8080/api/course-layouts?courseId=${selectedCourse}`)
    .then((res) => res.json())
    .then((data: any[]) => setTeeBoxes(data))
    .catch(console.error);
}, [selectedCourse]);

  const handleSubmit = () => {
    const payload = {
      date: format(date, "yyyy-MM-dd"),
      course: selectedCourse,
      teeBox: selectedTee,
      marker,
    };
    console.log("Sending data to backend:", payload);
    // fetch POST ได้ตรงนี้
  };

  return (
    <div className="space-y-5 p-6 border shadow rounded-xl bg-white">
      <h1 className="text-lg font-semibold text-blue-800">Scorecard Submission</h1>

      {/* Date */}
      <div>
        <Label>Playing Date</Label>
        <Input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>

      {/* Golf Course */}
      <div>
        <Label>Golf Course</Label>
        <select
          className="w-full border rounded p-2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Tee Box */}
      <div>
        <Label>Tee Box</Label>
        <select
          className="w-full border rounded p-2"
          value={selectedTee}
          onChange={(e) => setSelectedTee(e.target.value)}
        >
          <option value="">Select tee box</option>
          {teeBoxes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Marker */}
      <div>
        <Label>Marker</Label>
        <Input
          placeholder="Enter marker name"
          value={marker}
          onChange={(e) => setMarker(e.target.value)}
        />
      </div>

      <Button className="w-full mt-4" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
}
