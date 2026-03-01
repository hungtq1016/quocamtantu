import type { ReactNode } from "react";
import { useFont } from "../../contexts/FontContext";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

import { Columns, Rows } from "lucide-react";

export default function FontTabs() {
  const { fonts, font, setFont } = useFont();

  const icons: Record<string, ReactNode> = {
    h: <Columns size={18} />,
    v: <Rows size={18} />,
    m: <span className="text-sm">⿻</span>,
  };

  return (
    <div className="flex items-center gap-2">
      {fonts.map((f) => (
        <Tooltip key={f.id}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={font.id === f.id ? "default" : "outline"}
              onClick={() => setFont(f)}
              className="font-sans"
            >
              {icons[f.id]}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {f.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
