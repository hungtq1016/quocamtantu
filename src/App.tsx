import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Toolbar from "./components/editor/Toolbar";
import EditorInput from "./components/editor/EditorInput";
import EditorOutput from "./components/editor/EditorOutput";
import FontShowcase from "./components/editor/FontShowcase";
import Contribute from "./components/editor/Contribute";
import { useMapping } from "./hooks/useMapping";
import { buildConverter } from "./utils/converter";
import { exportElementToPDF } from "./utils/exportPDF";
import CachGhepChu from "./components/About";

export default function LatinUnicodeEditor() {
  const mapping = useMapping();

  const [input, setInput] = useState("");
  const [auto, setAuto] = useState(true);
  const [fontSize, setFontSize] = useState(36);
  const [writingMode, setWritingMode] = useState<"horizontal" | "vertical">("horizontal");

  const convert = useMemo(() => buildConverter(mapping), [mapping]);

  const output = useMemo(() => {
    if (!auto) return input;
    return convert(input.replace(/\s+/g, ""));
  }, [input, auto, convert]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
        Bộ chuyển Quốc Ngữ sang Quốc Âm Tân Tự
      </motion.h1>

      <Toolbar
        auto={auto}
        setAuto={setAuto}
        fontSize={fontSize}
        setFontSize={setFontSize}
        writingMode={writingMode}
        toggleMode={() => setWritingMode(writingMode === "vertical" ? "horizontal" : "vertical")}
        onCopy={() => navigator.clipboard.writeText(output)}
        onClear={() => setInput("")}
        onExport={() => {
          const el = document.getElementById("unicode-output");
          if (el) exportElementToPDF(el);
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <EditorInput value={input} onChange={setInput} />
        <EditorOutput text={output} fontSize={fontSize} writingMode={writingMode} />
        <FontShowcase/>
        <CachGhepChu/>
        <Contribute />
      </div>
    </div>
  );
}
