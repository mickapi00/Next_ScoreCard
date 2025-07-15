import * as React from "react";
import { Button } from "@/components/ui/button"; // ปุ่มของคุณที่มีอยู่แล้ว

// ปุ่มกลุ่มสำหรับโพสต์หรือยกเลิก
export const ScoreButtons = () => {
  return (
    <div className="flex gap-4 mt-4 justify-end">
      <Button className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
      <Button className="bg-green-600 hover:bg-green-700">Post Score →</Button>
    </div>
  );
};

export default ScoreButtons;
