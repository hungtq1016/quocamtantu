/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { initials } from "../../data/initials";
import { finals } from "../../data/finals";
import { tones } from "../../data/tones";
import { useFont } from "../../contexts/FontContext";
//import Disclosure from "../ui/disclosure";

/* ================================
   Types
================================ */

type Item = {
  label: string;
  ch: string;
};

/* ================================
   Component
================================ */

export default function FontShowcase(): React.JSX.Element {
  /* ================================
     State
  ================================ */

  const [toneIndex, setToneIndex] = useState<number | null>(null);
  const { font } = useFont();

  /* ================================
     Glyph style
  ================================ */

  const glyphStyle: React.CSSProperties = {
    fontFamily: font.family,
    fontSize: 36,
    lineHeight: 1,
  };

  /* ================================
     INITIALS
  ================================ */

  const initialsItems: Item[] = useMemo(() => {
    const start = 0x010008;

    return initials.map((label, i) => ({
      label,
      ch: String.fromCodePoint(start + i),
    }));
  }, []);

  /* ================================
     FINALS
  ================================ */

  const finalsItems: Item[] = useMemo(() => {
    const start = 0x010030;

    return finals.map((label, i) => ({
      label,
      ch: String.fromCodePoint(start + i),
    }));
  }, []);

  /* ================================
     TONES
  ================================ */

  const tonesItems: Item[] = useMemo(() => {
    const start = 0x010000;

    return tones.map((label, i) => ({
      label,
      ch: String.fromCodePoint(start + i),
    }));
  }, []);

  /* ================================
     Tạo mã giả sinh ra hợp âm và 8 tones
  ================================ */

  // const mixItems: Item[] = useMemo(() => {
  //   const start = 0x010100;
  //   const step = 9;

  //   const list: Item[] = [];

  //   initials.forEach((ini, i) => {
  //     finals.forEach((fin, j) => {
  //       const mixIndex = i * finals.length + j;

  //       const offset = toneIndex === null ? 0 : toneIndex + 1;

  //       const code = start + mixIndex * step + offset;


  //       list.push({
  //         label: `${ini}${fin}`,
  //         ch: String.fromCodePoint(code),
  //       });
  //     });
  //   });

  //   return list;
  // }, [toneIndex]);

  /* ================================
     Render
  ================================ */

  return (
    <>
      <Card className="rounded-2xl shadow mt-6 col-span-2">
        <CardContent className="p-4 space-y-6">
          {/* ================= INITIALS ================= */}
          <div>
            <p className="font-semibold mb-2">Phụ Âm</p>

            <div
              className="grid gap-3 p-3 bg-gray-100 rounded-xl border"
              style={
                {
                  direction: "rtl",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "repeat(22, auto)",
                } as React.CSSProperties
              }
            >
              {initialsItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white rounded-lg px-2 py-2 shadow-sm"
                >
                  <span className="text-[11px] text-gray-500 mb-1">
                    {item.label || "∅"}
                  </span>

                  <span style={glyphStyle}>{item.ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= FINALS ================= */}
          <div>
            <p className="font-semibold mb-2">Nguyên âm</p>

            <div
              className="grid gap-3 p-3 bg-gray-100 rounded-xl border"
              style={
                {
                  direction: "rtl",
                  gridAutoFlow: "column",
                  gridTemplateRows: "repeat(5, auto)",
                } as React.CSSProperties
              }
            >
              {finalsItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white rounded-lg px-2 py-2 shadow-sm"
                >
                  <span className="text-[11px] text-gray-500 mb-1">
                    {item.label}
                  </span>

                  <span style={glyphStyle}>{item.ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= TONES ================= */}
          <div>
            <p className="font-semibold mb-2">
              Thanh điệu
            </p>
            <div
              className="grid gap-3 p-3 bg-gray-100 rounded-xl border"
              style={
                {
                  direction: "rtl",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "repeat(22, auto)",
                } as React.CSSProperties
              }
            >


              {/* TONES */}
              {tonesItems.map((item, index) => {
                const hex = (cp: number) => cp.toString(16).toUpperCase().padStart(6, "0");
                const cp = 0x010000 + index;
                return (
                  <button
                    key={index}
                    onClick={() =>
                      setToneIndex(toneIndex === index ? null : index)
                    }
                    className={`
                  flex flex-col items-center rounded-lg px-2 py-2 shadow-sm transition
                  ${toneIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-50"
                      }
                `}
                  >
                    <span className="text-[11px] mb-1">{item.label}</span>
                    <img
                      src={`/tones/${hex(cp)}.svg`}
                      style={{ width: 22, height: 22 }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

        </CardContent>
      </Card>
      {/* Ẩn tạm thời vì vấn đề hiệu năng */}

      <Card className="rounded-2xl shadow mt-6 col-span-2">
        <CardContent className="p-4 space-y-6">
          {/* ================= MIX PREVIEW ================= */}
          {/* <Disclosure title="Hợp Âm" defaultOpen={false}>
            <div
              className="grid gap-3 px-3 pt-2 bg-gray-100 rounded-2xl border mt-2"
              style={{
                gridTemplateColumns: "repeat(20, 1fr)",
              }}
            >
              {mixItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center bg-white rounded-xl px-2 py-2 shadow-sm hover:shadow transition"
                >
                  <span className="text-[10px] text-gray-500 mb-1">
                    {item.label}
                  </span>

                  <span style={glyphStyle}>{item.ch}</span>
                </div>
              ))}
            </div>
          </Disclosure> */}

        </CardContent>
      </Card>
    </>
  );
}
