import { Card, CardContent } from "../ui/card";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function EditorInput({ value, onChange }: Props) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-4">
        <p className="font-semibold mb-2">Quốc Ngữ</p>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 resize-none p-3 border rounded-xl font-mono text-sm"
          placeholder="Gõ tiếng Việt có dấu ở đây..."
        />
      </CardContent>
    </Card>
  );
}
