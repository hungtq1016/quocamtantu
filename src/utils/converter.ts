import type { Mapping } from "./parseTSV";

export function buildConverter(mapping: Mapping) {
  const index: Record<string, string[]> = {};

  for (const key in mapping) {
    const k = key.toLowerCase();
    const first = k[0];

    if (!index[first]) index[first] = [];
    index[first].push(k);
  }

  // ===== sort bucket =====
  for (const c in index) {
    index[c].sort((a, b) => {
      const pa = mapping[a].priority;
      const pb = mapping[b].priority;

      if (pa !== pb) return pb - pa;
      return b.length - a.length;
    });
  }

  // ===== converter =====
  return (text: string) => {
    const lower = text.toLowerCase(); 

    let out = "";
    let i = 0;

    while (i < lower.length) {
      const bucket = index[lower[i]];

      if (!bucket) {
        out += text[i];
        i++;
        continue;
      }

      let matched = false;

      for (const key of bucket) {
        if (lower.startsWith(key, i)) {
          out += mapping[key].value;
          i += key.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        out += text[i];
        i++;
      }
    }

    return out;
  };
}
