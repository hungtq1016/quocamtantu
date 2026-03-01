export type MappingItem = {
  value: string;
  priority: number;
};

export type Mapping = Record<string, MappingItem>;

export function parseTSV(text: string): Mapping {
  text = text.replace(/^\uFEFF/, "");

  const map: Mapping = {};
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // unicode  key  priority
    const parts = line.split(/\s+/);

    if (parts.length < 2) continue;

    const unicode = parts[0];
    const key = parts[1];
    const priority = Number(parts[2] ?? 0);

    map[key] = {
      value: unicode,
      priority,
    };
  }

  return map;
}
