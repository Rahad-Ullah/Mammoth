"use client";

import React, { useState } from "react";
import { Stage, Layer, Image, Circle, Text } from "react-konva";
import useImage from "use-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you're using ShadCN's Select component
import { Check } from "lucide-react";

const pointsData = [
  { name: "Proximal Arm", abbreviation: "PA", x: 250, y: 130 },
  { name: "Distal Arm", abbreviation: "DA", x: 290, y: 210 },
  { name: "Proximal Thigh", abbreviation: "PT", x: 220, y: 300 },
  { name: "Distal Thigh", abbreviation: "DT", x: 210, y: 350 },
  { name: "Calf", abbreviation: "C", x: 210, y: 390 },
  { name: "Ankle", abbreviation: "A", x: 205, y: 445 },
  { name: "Foot", abbreviation: "F", x: 200, y: 500 },
];

const ImageAnnotation = () => {
  const [selectedPoints, setSelectedPoints] = useState<Set<string>>(new Set());
  const [image, loading] = useImage("/images/male-back.png");

  // Toggle selection of a point
  const handleSelection = (point: string) => {
    const newSelectedPoints = new Set(selectedPoints);
    if (newSelectedPoints.has(point)) {
      newSelectedPoints.delete(point); // Deselect if already selected
    } else {
      newSelectedPoints.add(point); // Select the point
    }
    setSelectedPoints(newSelectedPoints);
  };

  const test = () => {
    console.log("hjello");
  };

  if (loading === "loading") {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-xs rounded-lg">
        <Select
          onValueChange={(value) => handleSelection(value)}
          value={Array.from(selectedPoints).join(", ")}
        >
          <SelectTrigger className="rounded-lg py-6">
            <SelectValue placeholder="Select Points">
              {Array.from(selectedPoints).length > 0 ? (
                // Display selected point names in the trigger button
                Array.from(selectedPoints)
                  .map(
                    (abbr) =>
                      pointsData.find((point) => point.abbreviation === abbr)
                        ?.name
                  )
                  .join(", ") // Join multiple names with commas
              ) : (
                <span>Select Points</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="space-y-2 p-2">
            {pointsData.map((point) => (
              <SelectItem key={point.abbreviation} value={point.abbreviation}>
                <div className="w-[240px] flex justify-between gap-1">
                  <span onClick={test}> {point.name}</span>
                  {selectedPoints.size > 0 &&
                    selectedPoints.has(point.abbreviation) && (
                      <Check size={16} />
                    )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Stage width={800 * 0.45} height={1200 * 0.45}>
        <Layer>
          <Image image={image} width={800 * 0.45} height={1200 * 0.45} />

          {/* Render circles for selected points */}
          {pointsData.map((point) => (
            <React.Fragment key={point.abbreviation}>
              <Circle
                x={point.x}
                y={point.y}
                radius={7}
                fill={
                  selectedPoints.has(point.abbreviation) ? "red" : "turquoise"
                }
              />
              <Text
                x={point.x + 20} // Slight offset for text visibility
                y={point.y - 5} // Slight offset for text visibility
                text={`← ${point.name} (${point.abbreviation})`}
                fontSize={12}
                fontFamily="Poppins"
                fill="gray"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotation;
