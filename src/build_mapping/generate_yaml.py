import json
import os
import unicodedata

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INITIAL_FILE = os.path.join(BASE_DIR, "initials.json")
FINAL_FILE   = os.path.join(BASE_DIR, "finals.json")
OUT_FILE     = os.path.join(BASE_DIR, "dict.yaml")

BASE_CODEPOINT = 0x010100


# =========================================
# SHARE UNICODE
# =========================================
COPY_RULES = {
    "c":  ["k", "q"],
    "d":  ["gi"],
    "ng": ["ngh"]
}


# =========================================
# NHẬP
# =========================================
NHAP_MAP = {
    "ng": "c",
    "nh": "ch",
    "m":  "p",
    "n":  "t"
}


# =========================================
# TONES
# =========================================
TONES = [
    "", "\u0300", "\u0303", "\u0323", "\u0323",
    "", "\u0309", "\u0301", "\u0301"
]


# =========================================
def load_json(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def convert_nhap(final):
    for k, v in NHAP_MAP.items():
        if final.endswith(k):
            return final[:-len(k)] + v
    return final


# =========================================
# tone placement
# =========================================

SPECIAL_CLUSTERS = [
    ("ươ", 1), 
    ("ưa", 0),
    ("uô", 1),
    ("iê", 1),
    ("yê", 1),
]


PRIORITY = "ăâêôơư"
ALL_VOWELS = "aeiouyăâêôơư"


def find_tone_index(chars):
    word = "".join(chars).lower()

    for cluster, pos in SPECIAL_CLUSTERS:
        idx = word.find(cluster)
        if idx != -1:
            return idx + pos

    for i, c in enumerate(chars):
        if c.lower() in PRIORITY:
            return i

    vowels = [i for i, c in enumerate(chars) if c.lower() in ALL_VOWELS]
    if len(vowels) >= 2:
        return vowels[len(vowels)//2]

    return vowels[0] if vowels else None


def add_tone(word, mark):
    if not mark:
        return word

    chars = list(word)
    idx = find_tone_index(chars)
    if idx is None:
        return word

    chars[idx] = unicodedata.normalize("NFC", chars[idx] + mark)
    return "".join(chars)


def weight(w):
    return 1000 + len(w)


# =========================================
def build_yaml():
    initials = load_json(INITIAL_FILE)["initials"]
    finals   = load_json(FINAL_FILE)["finals"]

    codepoint = BASE_CODEPOINT
    entries = []

    for ini in initials:
        for fin in finals:

            block = [chr(codepoint + i) for i in range(9)]
            codepoint += 9

            base = ini + fin
            nhap = ini + convert_nhap(fin)

            base_words = [add_tone(base, t) for t in TONES]
            nhap_words = [add_tone(nhap, t) for t in TONES]

            tone_words = [
                base_words[0], base_words[1], base_words[2], base_words[3],
                nhap_words[4], base_words[5], base_words[6],
                base_words[7], nhap_words[8]
            ]

            for ch, w in zip(block, tone_words):
                entries.append((ch, w))

            if ini in COPY_RULES:
                for alias in COPY_RULES[ini]:
                    for ch, w in zip(block, tone_words):
                        entries.append((ch, alias + w[len(ini):]))

    entries.sort(key=lambda x: -len(x[1]))

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        for ch, w in entries:
            f.write(f"{ch}\t{w}\t{weight(w)}\n")

    print("Generated:", OUT_FILE)


if __name__ == "__main__":
    build_yaml()