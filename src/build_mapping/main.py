import json
import re
import unicodedata
import os
from wordfreq import zipf_frequency

# =========================================================
# CONFIG
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INITIAL_FILE = os.path.join(BASE_DIR, "initials.json")
FINAL_FILE   = os.path.join(BASE_DIR, "finals.json")
OUT_FILE     = os.path.join(BASE_DIR, "mapping.yaml")

TONE_START = 0x010100
BLOCK_SIZE = 9
REMOVE_BASE_KEY = True
MIN_ZIPF = 2.0

tone_keys = ["", "f", "x", "j", "j", "z", "r", "s", "s"]
usable_tones = range(9)

# =========================================================
# LOAD JSON
# =========================================================

def load_initials():
    with open(INITIAL_FILE, encoding="utf-8") as f:
        data = json.load(f)

    raw = data["initials"]

    result = []
    for item in raw:
        if isinstance(item, str):
            result.append({"value": item, "alias": []})
        else:
            result.append({
                "value": item["value"],
                "alias": item.get("alias", [])
            })
    return result


def load_finals():
    with open(FINAL_FILE, encoding="utf-8") as f:
        data = json.load(f)

    raw = data["finals"]

    result = []
    for item in raw:
        if isinstance(item, str):
            result.append(item)
        else:
            result.append(item["value"])

    return result


# =========================================================
# TELEX MAP
# =========================================================

BASE_MAP = {
    "aa": "â",
    "aw": "ă",
    "ee": "ê",
    "oo": "ô",
    "ow": "ơ",
    "uw": "ư",
    "dd": "đ",
}

vowel_map = {
    "ư": "uw",
    "ơ": "ow",
    "ô": "oo",
    "â": "aa",
    "ê": "ee",
    "ă": "aw",
    "đ": "dd",
}

TONE_MAP = {
    "s": "́",
    "f": "̀",
    "r": "̉",
    "x": "̃",
    "j": "̣",
    "z": "",
}

PRIORITY_1 = "ăâêôơư"
PRIORITY_2 = "aeo"
PRIORITY_3 = "iuy"

SPECIAL_CLUSTERS = [
    ("ươ", 1),
    ("uô", 1),
    ("iê", 1),
    ("yê", 1),
    ("uyê", 2),
]

entering_map = {
    "ng": "c",
    "nh": "ch",
    "m": "p",
    "n": "t",
}

# =========================================================
# UTIL
# =========================================================

def to_telex(text):
    for k, v in vowel_map.items():
        text = text.replace(k, v)
    return text


def entering_change(s):
    for k in sorted(entering_map, key=len, reverse=True):
        if s.endswith(k):
            return s[:-len(k)] + entering_map[k]
    return s


def is_front_vowel(fin):
    return fin.startswith(("e", "ee", "i", "ie", "ieu", "y"))


def is_valid_spelling(ini, fin):

    if ini == "k" and not is_front_vowel(fin):
        return False

    if ini in ("gh", "ngh") and not is_front_vowel(fin):
        return False

    if ini == "q" and not fin.startswith("u"):
        return False

    if ini == "c" and is_front_vowel(fin):
        return False

    return True


def convert_base(word):
    regex = re.compile("|".join(sorted(BASE_MAP, key=len, reverse=True)))
    return regex.sub(lambda m: BASE_MAP[m.group()], word)


def extract_tone(word):
    if not word:
        return word, ""
    last = word[-1]
    if last in TONE_MAP:
        return word[:-1], last
    return word, ""


def find_vowel_index(chars):
    word = "".join(chars)

    for cluster, offset in SPECIAL_CLUSTERS:
        pos = word.find(cluster)
        if pos != -1:
            return pos + offset

    for i, c in enumerate(chars):
        if c in PRIORITY_1:
            return i

    for i, c in enumerate(chars):
        if c in PRIORITY_2:
            return i

    for i, c in enumerate(chars):
        if c in PRIORITY_3:
            return i

    return -1


def apply_tone(word, tone_char):
    if tone_char not in TONE_MAP:
        return word

    chars = list(word)
    idx = find_vowel_index(chars)

    if idx == -1:
        return word

    chars[idx] = unicodedata.normalize(
        "NFC", chars[idx] + TONE_MAP[tone_char]
    )

    return "".join(chars)


def telex_to_vi(word):
    base, tone = extract_tone(word)
    base = convert_base(base)
    if tone:
        base = apply_tone(base, tone)
    return base


def is_valid_vietnamese(word):
    if not word:
        return False
    return zipf_frequency(word.lower(), "vi") >= MIN_ZIPF


def get_block_pos(uni_char):
    code = ord(uni_char)
    return (code - TONE_START) % BLOCK_SIZE


# =========================================================
# MAIN BUILD
# =========================================================

def build():

    initials = load_initials()
    finals = load_finals()

    output = []

    for i_idx, ini_obj in enumerate(initials):

        ini = ini_obj["value"]
        aliases = ini_obj["alias"]

        ini_telex = to_telex(ini)

        # ===== TẠO DANH SÁCH INITIAL BIẾN THỂ =====
        initial_variants = [ini_telex]

        if ini_telex == "c":
            initial_variants.append("k")
            initial_variants.append("q")

        for f_idx, fin in enumerate(finals):

            fin_telex = to_telex(fin)

            base_code = TONE_START + (i_idx * len(finals) + f_idx) * BLOCK_SIZE

            for t in usable_tones:

                uni_char = chr(base_code + t)
                tone_key = tone_keys[t]

                fin_key = fin_telex

                if t in (4, 8):
                    fin_key = entering_change(fin_key)

                for ini_variant in initial_variants:

                    # ===== CHECK CHÍNH TẢ SAU KHI COPY =====
                    if not is_valid_spelling(ini_variant, fin_key):
                        continue

                    key = ini_variant + fin_key + tone_key

                    pos = get_block_pos(uni_char)

                    if pos == 0 and REMOVE_BASE_KEY:
                        continue

                    if pos == 0:
                        word = key
                    else:
                        word = telex_to_vi(key)

                    if not is_valid_vietnamese(word):
                        continue

                    weight = 1000 + len(key)

                    output.append(f"{uni_char}\t{word}\t{weight}")

                # ===== alias initials (giữ nguyên) =====
                for alias in aliases:
                    alias_telex = to_telex(alias)

                    if not is_valid_spelling(alias_telex, fin_key):
                        continue

                    alias_key = alias_telex + fin_key + tone_key
                    alias_word = telex_to_vi(alias_key)

                    if is_valid_vietnamese(alias_word):
                        output.append(
                            f"{uni_char}\t{alias_word}\t{100 + len(alias_key)}"
                        )

                # ===== i -> y alias =====
                if fin == "i":
                    for ini_variant in initial_variants:
                        y_key = ini_variant + "y" + tone_key
                        y_word = telex_to_vi(y_key)

                        if is_valid_vietnamese(y_word):
                            output.append(
                                f"{uni_char}\t{y_word}\t{100 + len(y_key)}"
                            )

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(output))

    print("Done ->", OUT_FILE)

# =========================================================
if __name__ == "__main__":
    build()