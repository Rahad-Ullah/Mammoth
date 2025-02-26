"use client";

import React, { useState } from "react";
import { Stage, Layer, Image, Circle } from "react-konva";
import useImage from "use-image";

const pointsData = [
  { name: "Proximal Arm", abbreviation: "PA", x: 300, y: 100 },
  { name: "Distal Arm", abbreviation: "DA", x: 250, y: 200 },
  { name: "Proximal Thigh", abbreviation: "PT", x: 300, y: 300 },
  { name: "Distal Thigh", abbreviation: "DT", x: 300, y: 400 },
  { name: "Calf", abbreviation: "C", x: 300, y: 500 },
  { name: "Ankle", abbreviation: "A", x: 300, y: 600 },
  { name: "Foot", abbreviation: "F", x: 300, y: 700 },
];

const ImageAnnotation = () => {
  const [selectedPoint, setSelectedPoint] = useState("");
  // Correcting the image path to use the public folder
  const [image, loading] = useImage("/images/male-back.png");
  console.log(loading);

  const handleSelection = (e) => {
    setSelectedPoint(e.target.value);
  };

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <select
        className="border rounded px-4 py-2 mb-4"
        onChange={handleSelection}
        value={selectedPoint}
      >
        <option value="">Select Point</option>
        {pointsData.map((point) => (
          <option key={point.abbreviation} value={point.abbreviation}>
            {point.name}
          </option>
        ))}
      </select>

      <Stage width={800} height={1000}>
        <Layer>
          <Image image={image} width={800} height={1000} alt="Anatomy Image" />

          {pointsData.map((point) => (
            <Circle
              key={point.abbreviation}
              x={point.x}
              y={point.y}
              radius={10}
              fill={selectedPoint === point.abbreviation ? "red" : "blue"}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotation;
