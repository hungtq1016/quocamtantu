import { useEffect, useState } from "react";
import { parseTSV, type Mapping } from "../utils/parseTSV";

export function useMapping(url = "/mapping.yaml") {
  const [mapping, setMapping] = useState<Mapping>({});

  useEffect(() => {
    fetch(url)
      .then((r) => r.text())
      .then((t) => setMapping(parseTSV(t)));
  }, [url]);

  return mapping;
}
