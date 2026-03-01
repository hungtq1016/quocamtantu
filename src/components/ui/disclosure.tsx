import { useState } from "react";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function Disclosure({
  title,
  defaultOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-2">
      {/* header */}
      <div className="flex items-center gap-2 mb-0">
        <Button
          type="button"
          size="icon"
          variant={open ? "default" : "outline"}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown
            size={18}
            className={clsx("transition-transform", open && "rotate-180")}
          />
        </Button>

        <span className="font-semibold text-sm">{title}</span>
      </div>

      {/* body — KHÔNG unmount nữa */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
