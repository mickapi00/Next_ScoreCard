"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fetchCourses} from "./services/scorecard.service";
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
  const [markers, setMarkers] = useState<MarkersInterface[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedMarker, setSelectedMarker] = useState<string>("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [layoutsFront, setLayoutsFront] = useState<LayoutsInterface[]>([]);
  const [layoutsBack, setLayoutsBack] = useState<LayoutsInterface[]>([]);
  const [selectedLayoutBack,setselectedLayoutBack] = useState<string>("");
  const [selectedLayoutFront,setselectedLayoutFront] = useState<string>("");


  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCourses(true);
        const data = await fetchCourses();
        setCourses(data.filter(c => c.name));
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
    fetchLayouts(selectedCourse)
      .then(setLayout)
      .catch(console.error);
  }, [selectedCourse]);

  useEffect(() => 
    {

    if (!selectedLayoutFront || !selectedLayoutBack) {
    setMarkers([]);
    setSelectedMarker("");
    return;
  }
  // ดึง markers โดยใช้ layout ใด layout หนึ่ง (หรือจะส่งทั้งสองก็ได้ถ้า API รองรับ)
    fetchMarkers(selectedLayoutBack || selectedLayoutBack)
    .then(setMarkers)
    .catch(console.error);
  }, [selectedLayoutBack, selectedLayoutFront]);

  const handleSubmit = () => {
    const payload = {
      date: format(date, "yyyy-MM-dd"),
      course: selectedCourse,
      layoutback: selectedLayoutBack,
      layoutfront: selectedLayoutFront,
      markers: selectedMarker,
    };
    console.log("Sending data to backend:", payload);
    router.push("/nextpage");
    // TODO: POST fetch
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-80 min-h-[600px] flex flex-col space-y-6 p-8 border shadow-2xl rounded-3xl bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Scorecard</h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Store and archive scorecards for future reference.<br />
          Access round history for analysis or sharing.
        </p>
        <hr className="w-full border-t border-gray-200 mb-4" />

        <div className="space-y-4">
          <div>
            <Label>Playing Date</Label>
            <Input
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>

          <div>
            <Label>Golf Course</Label>
            {loadingCourses ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : (
              <select
                className="w-full border rounded p-2"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select course</option>
                {courses.map(c => (
                  <option key={c.courseId} value={c.courseId}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <Label>Layout Front</Label>
          <select
              className="w-full border rounded p-2"
              value={selectedLayoutFront}
              onChange={(e) => setselectedLayoutFront(e.target.value)}
              >
                <option value=""> Select layout(Front)</option>
                  {layouts.map(l => (
                //<option key={l.courseId + "-front"} value={l.courselayoutId}>{l.courselayout}</option>
                <option key={l.courselayoutId} value={l.courselayoutId}>{l.courselayout}</option>
              ))}
         </select>
        </div>

          <div>
            <Label>Layout Back</Label>
          <select
              className="w-full border rounded p-2 bg-red-100"
              value={selectedLayoutBack}
              onChange={(e) => setselectedLayoutBack(e.target.value)}
          >
              <option value="">Select layout (Back)</option>
              {layouts.map(l => (
              <option key={l.courselayoutId} value={l.courselayoutId}>{l.courselayout}</option>
              ))}
            </select>
        </div>


          <div>
            <Label>Markers</Label>
            <select
              className="w-full border rounded p-2"
              value={selectedMarker}
              onChange={(e) => setSelectedMarker(e.target.value)}
            >
              <option value="">Select marker</option>
              {markers.map(m => (
                <option key={m.markersId} value={m.markersDetails}>{m.color}</option>
              ))}
            </select>
          </div>
        </div>

        <Button className="w-full mt-4 bg-black text-white py-3 rounded-xl" onClick={handleSubmit}
          disabled={!selectedMarker}>
          Next
        </Button>
      </div>
    </div>
  );
}
