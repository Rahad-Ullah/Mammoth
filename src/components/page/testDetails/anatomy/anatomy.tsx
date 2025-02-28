"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mars, RefreshCcw, Venus } from "lucide-react";
import React, { useState } from "react";
import { Stage, Layer, Image, Circle, Text } from "react-konva";
import useImage from "use-image";

const pointsData = [
  {
    name: "Proximal Arm",
    abbreviation: "PA",
    position: "Left",
    x: 105,
    y: 150,
  },
  {
    name: "Proximal Arm",
    abbreviation: "PA",
    position: "Right",
    x: 235,
    y: 150,
  },
  { name: "Distal Arm", abbreviation: "DA", position: "Left", x: 60, y: 210 },
  { name: "Distal Arm", abbreviation: "DA", position: "Right", x: 275, y: 210 },
  {
    name: "Proximal Thigh",
    abbreviation: "PT",
    position: "Left",
    x: 140,
    y: 310,
  },
  {
    name: "Proximal Thigh",
    abbreviation: "PT",
    position: "Right",
    x: 210,
    y: 310,
  },
  {
    name: "Distal Thigh",
    abbreviation: "DT",
    position: "Left",
    x: 145,
    y: 355,
  },
  {
    name: "Distal Thigh",
    abbreviation: "DT",
    position: "Right",
    x: 200,
    y: 355,
  },
  { name: "Calf", abbreviation: "C", position: "Left", x: 145, y: 410 },
  { name: "Calf", abbreviation: "C", position: "Right", x: 200, y: 410 },
  { name: "Ankle", abbreviation: "A", position: "Left", x: 150, y: 455 },
  { name: "Ankle", abbreviation: "A", position: "Right", x: 200, y: 455 },
  { name: "Foot", abbreviation: "F", position: "Left", x: 150, y: 520 },
  { name: "Foot", abbreviation: "F", position: "Right", x: 190, y: 520 },
];

const selectedPoints = [
  {
    name: "Proximal Arm",
    abbreviation: "PA",
    position: "Left",
  },
  { name: "Distal Arm", abbreviation: "DA", position: "Left" },
  { name: "Distal Arm", abbreviation: "DA", position: "Right" },
];

const ImageAnnotation = () => {
  const [isHidden, setHidden] = useState(false);
  const [isImageFront, setIsImageFront] = useState(false);
  const [isGenderMale, setIsGenderMale] = useState(true);

  const [maleBack, loading] = useImage("/images/male-back.png");
  const [maleFront] = useImage("/images/male-front.png");
  const [femaleFront] = useImage("/images/female-front.png");

  if (loading === "loading") {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 sticky top-20">
      <div className="md:grid gap-2 mt-12 h-fit">
        <Button
          onClick={() => setHidden(!isHidden)}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          {isHidden ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          onClick={() => {
            setIsImageFront(!isImageFront);
          }}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          <RefreshCcw />
        </Button>
        <Button
          onClick={() => {
            setIsGenderMale(!isGenderMale);
          }}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          {isGenderMale ? <Mars /> : <Venus />}
        </Button>
      </div>
      <Stage width={390} height={560} className="flex-1">
        <Layer>
          {isGenderMale && !isImageFront && (
            <Image image={maleBack} width={340} height={560} alt="image" />
          )}
          {isGenderMale && isImageFront && (
            <Image image={maleFront} width={340} height={560} alt="image" />
          )}
          {!isGenderMale && isImageFront && (
            <Image image={femaleFront} width={340} height={560} alt="image" />
          )}
          {!isGenderMale && !isImageFront && (
            <Image image={maleBack} width={340} height={560} alt="image" />
          )}

          {/* Render circles for selected points */}
          {pointsData.map((point) => (
            <React.Fragment key={`${point.abbreviation} ${point.position}`}>
              <Circle
                x={point.x}
                y={point.y}
                radius={
                  selectedPoints.find(
                    (item) =>
                      item.abbreviation === point.abbreviation &&
                      item.position === point.position
                  )
                    ? 7
                    : 4
                }
                fill={
                  selectedPoints.find(
                    (item) =>
                      item.abbreviation === point.abbreviation &&
                      item.position === point.position
                  )
                    ? "red"
                    : "turquoise"
                }
              />
              {point.position === "Right" && !isHidden && (
                <Text
                  x={point.x + 15} // Slight offset for text visibility
                  y={point.y - 5} // Slight offset for text visibility
                  text={`← ${point.name} (${point.abbreviation})`}
                  fontSize={12}
                  fontFamily="Poppins"
                  fill="gray"
                />
              )}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotation;
