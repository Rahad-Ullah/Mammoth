import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mars, RefreshCcw, Venus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Circle, Text } from "react-konva";
import useImage from "use-image";

const pointsData = [
  {
    location: "Proximal Arm",
    abbreviation: "PA",
    side: "Left",
    x: 105,
    y: 150,
  },
  {
    location: "Proximal Arm",
    abbreviation: "PA",
    side: "Right",
    x: 235,
    y: 150,
  },
  {
    location: "Distal Arm",
    abbreviation: "DA",
    side: "Left",
    x: 60,
    y: 210,
  },
  {
    location: "Distal Arm",
    abbreviation: "DA",
    side: "Right",
    x: 275,
    y: 210,
  },
  {
    location: "Proximal Thigh",
    abbreviation: "PT",
    side: "Left",
    x: 140,
    y: 310,
  },
  {
    location: "Proximal Thigh",
    abbreviation: "PT",
    side: "Right",
    x: 210,
    y: 310,
  },
  {
    location: "Distal Thigh",
    abbreviation: "DT",
    side: "Left",
    x: 145,
    y: 355,
  },
  {
    location: "Distal Thigh",
    abbreviation: "DT",
    side: "Right",
    x: 200,
    y: 355,
  },
  { location: "Calf", abbreviation: "C", side: "Left", x: 145, y: 410 },
  { location: "Calf", abbreviation: "C", side: "Right", x: 200, y: 410 },
  { location: "Ankle", abbreviation: "A", side: "Left", x: 150, y: 455 },
  { location: "Ankle", abbreviation: "A", side: "Right", x: 200, y: 455 },
  { location: "Foot", abbreviation: "F", side: "Left", x: 150, y: 520 },
  { location: "Foot", abbreviation: "F", side: "Right", x: 190, y: 520 },
];

const ImageAnnotation = ({ testPoints }) => {
  const [isHidden, setHidden] = useState(false);
  const [isImageFront, setIsImageFront] = useState(false);
  const [isGenderMale, setIsGenderMale] = useState(true);

  const [maleBack, loading] = useImage("/images/male-back.png");
  const [maleFront] = useImage("/images/male-front.png");
  const [femaleFront] = useImage("/images/female-front.png");

  // Reference to circles for animation
  const circleRefs = useRef({});

  useEffect(() => {
    // Animation for selected circles every 500ms
    const interval = setInterval(() => {
      testPoints?.forEach((point) => {
        const circle =
          circleRefs.current[`${point.abbreviation}-${point.side}`];
        if (circle) {
          // Get the current scale
          const currentScale = circle.scaleX();
          // Animate scale to either 1.25 or 1 based on current state
          circle.to({
            scaleX: currentScale === 1 ? 1.5 : 1,
            scaleY: currentScale === 1 ? 1.5 : 1,
            duration: 0.3,
          });
        }
      });
    }, 500); // every 500ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [testPoints]); // Empty dependency array ensures the effect runs once

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
          {/* Image rendering */}
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

          {/* Render circles */}
          {pointsData.map((point) => {
            const isSelected = testPoints?.some(
              (item) =>
                item.abbreviation === point.abbreviation &&
                item.side === point.side
            );

            return (
              <React.Fragment key={`${point.abbreviation}-${point.side}`}>
                <Circle
                  ref={(el) => {
                    circleRefs.current[`${point.abbreviation}-${point.side}`] =
                      el;
                  }}
                  x={point.x}
                  y={point.y}
                  radius={isSelected ? 5 : 4}
                  fill={isSelected ? "red" : "turquoise"}
                />
                {point.side === "Right" && !isHidden && (
                  <Text
                    x={point.x + 15} // Slight offset for text visibility
                    y={point.y - 5} // Slight offset for text visibility
                    text={`← ${point.location} (${point.abbreviation})`}
                    fontSize={12}
                    fontFamily="Poppins"
                    fill="gray"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotation;
