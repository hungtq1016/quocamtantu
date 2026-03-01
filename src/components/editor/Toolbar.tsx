import { Button } from "../ui/button";
import {
  Zap,
  Copy,
  Trash2,
  Type,
  FileDown,
  ListChevronsDownUpIcon,
  Github,
  Facebook,
  Download,
  Users
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import FontTabs from "./FontTab";

type Props = {
  auto: boolean;
  setAuto: (v: boolean) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  writingMode: "horizontal" | "vertical";
  toggleMode: () => void;
  onCopy: () => void;
  onClear: () => void;
  onExport: () => void;
};

export default function Toolbar(props: Props) {
  return (
    <TooltipProvider>
      <div className="flex w-full items-center justify-between mb-4">

        {/* LEFT */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow w-fit">

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={props.auto ? "default" : "outline"}
                onClick={() => props.setAuto(!props.auto)}
              >
                <Zap size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chuyển ngữ tự động</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={props.onCopy}>
                <Copy size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sao chép</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={props.onClear}>
                <Trash2 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xóa nội dung</TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2 px-2">
            <Type size={16} />
            <input
              type="range"
              min={16}
              max={120}
              value={props.fontSize}
              onChange={(e) => props.setFontSize(Number(e.target.value))}
            />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={props.writingMode === "vertical" ? "default" : "outline"}
                onClick={props.toggleMode}
              >
                <ListChevronsDownUpIcon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Đổi chế độ dọc/ngang</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={props.onExport}>
                <FileDown size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tải xuống dạng PDF</TooltipContent>
          </Tooltip>

          <FontTabs />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow">

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => window.open("https://github.com/hungtq1016/quocamtantu", "_blank")}
              >
                <Github size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => window.open("/fonts.zip")}
              >
                <Download size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tải font</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => window.open("https://www.reddit.com/r/Qatt/", "_blank")}
              >
                <Users size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reddit</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => window.open("https://www.facebook.com/groups/1842030006367450", "_blank")}
              >
                <Facebook size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Cộng đồng</TooltipContent>
          </Tooltip>

        </div>
      </div>
    </TooltipProvider>
  );
}
