import { createContext, useContext, useState } from "react";

type Font = {
  id: string;
  label: string;
  family: string;
};

const fonts: Font[] = [
  { id: "h", label: "Horizontal", family: "QATT-H" },
  { id: "v", label: "Vertical", family: "QATT-V" },
];

type Ctx = {
  font: Font;
  setFont: (f: Font) => void;
  fonts: Font[];
};

const FontContext = createContext<Ctx | null>(null);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState(fonts[0]);

  return (
    <FontContext.Provider value={{ font, setFont, fonts }}>
      {children}
    </FontContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFont must be inside FontProvider");
  return ctx;
}
