import { Card, CardContent } from "../ui/card";
import React from "react";
import { useFont } from "../../contexts/FontContext";

type Props = {
  text: string;
  fontSize: number;
  writingMode: "horizontal" | "vertical";
};

export default function EditorOutput({
  text,
  fontSize,
  writingMode,
}: Props) {
  const isVertical = writingMode === "vertical";
  const { font } = useFont();

  const style: React.CSSProperties = {
    fontFamily: font.family,
    fontSize: `${fontSize}px`,
    writingMode: isVertical ? "vertical-rl" : "horizontal-tb",
    textOrientation: isVertical ? "upright" : "mixed",
    lineHeight: 1.3,
    letterSpacing: isVertical ? "2px" : "normal",
  };

  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-4">
        <p className="font-semibold mb-2">Quốc Âm Tân Tự</p>

        <div
          id="unicode-output"
          style={style}
          className="w-full h-96 p-3 border rounded-xl bg-gray-100 overflow-auto whitespace-pre-wrap break-all"
        >
          {text}
        </div>
      </CardContent>
    </Card>
  );
}
