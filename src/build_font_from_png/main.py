import sys
import os
import subprocess

import png2svg
import merge_svg
import chunk_split
import merge_font


# =====================================================
# PATH CONFIG
# =====================================================
BASE = os.path.dirname(__file__)

PNG_DIR     = os.path.join(BASE, "pngs")
SVG_DIR     = os.path.join(BASE, "svgs")
MERGED_DIR  = os.path.join(BASE, "merged_svgs")
CHUNK_DIR   = os.path.join(BASE, "chunks")
FONT_DIR    = os.path.join(BASE, "chunk_fonts")
FINAL_FONT  = os.path.join(BASE, "qatt.ttf")

FONTFORGE = r"C:\Program Files (x86)\FontForgeBuilds\bin\fontforge.exe"
BUILD_FONT_SCRIPT = os.path.join(BASE, "build_font.py")


# =====================================================
def build_fonts():
    subprocess.run([
        FONTFORGE,
        "-script",
        BUILD_FONT_SCRIPT
    ], check=True)


# =====================================================
def run_all():

    print("\n=== PNG TO SVG ===")
    png2svg.run(PNG_DIR, SVG_DIR)

    print("\n=== MERGE SVG ===")
    merge_svg.run(SVG_DIR, MERGED_DIR)

    print("\n=== SPLIT CHUNKS ===")
    chunk_split.run(MERGED_DIR, CHUNK_DIR, SVG_DIR)

    print("\n=== BUILD CHUNK FONTS ===")
    build_fonts()

    print("\n=== MERGE FINAL FONT ===")
    merge_font.run(FONT_DIR, FINAL_FONT)

    print("\nDONE:", FINAL_FONT)


# =====================================================
if __name__ == "__main__":

    cmd = sys.argv[1] if len(sys.argv) > 1 else "all"

    if cmd == "png2svg":
        png2svg.run(PNG_DIR, SVG_DIR)

    elif cmd == "merge":
        merge_svg.run(SVG_DIR, MERGED_DIR)

    elif cmd == "chunk":
        chunk_split.run(MERGED_DIR, CHUNK_DIR, SVG_DIR)

    elif cmd == "font":
        build_fonts()

    elif cmd == "mergefont":
        merge_font.run(FONT_DIR, FINAL_FONT)

    else:
        run_all()