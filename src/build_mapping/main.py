import os
from wordfreq import zipf_frequency

# import builder
import generate_yaml


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE  = os.path.join(BASE_DIR, "dict.yaml")
OUTPUT_FILE = os.path.join(BASE_DIR, "mapping.yaml")

LANG = "vi"
MIN_FREQ = 2.0


def is_vietnamese(word):
    return zipf_frequency(word, LANG) >= MIN_FREQ


def filter_yaml():
    kept = removed = 0

    with open(INPUT_FILE, encoding="utf-8") as f_in, \
         open(OUTPUT_FILE, "w", encoding="utf-8") as f_out:

        for line in f_in:

            if not line.strip() or line.startswith("#"):
                f_out.write(line)
                continue

            glyph, word, weight = line.rstrip("\n").split("\t")

            if is_vietnamese(word):
                f_out.write(line)
                kept += 1
            else:
                removed += 1

    print("Filtered ->", OUTPUT_FILE)
    print("Kept:", kept, " Removed:", removed)


# =========================================
def main():
    print("Step 1: generate dict...")
    generate_yaml.build_yaml()

    print("Step 2: filter Vietnamese words...")
    filter_yaml()


if __name__ == "__main__":
    main()