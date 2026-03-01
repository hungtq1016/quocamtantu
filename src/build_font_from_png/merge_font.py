import os
from fontTools.merge import Merger


# =====================================================
# MAIN
# =====================================================
def run(fonts_dir, out_font):

    EM = 1000
    FAMILY = "qatt"

    fonts = sorted([
        os.path.join(fonts_dir, f)
        for f in os.listdir(fonts_dir)
        if f.endswith(".ttf")
    ])

    print("Found", len(fonts), "fonts")

    if not fonts:
        print("No fonts to merge")
        return

    merger = Merger()
    font = merger.merge(fonts)


    # ---------------- metadata ----------------
    font["head"].unitsPerEm = EM

    font["hhea"].ascent  = EM
    font["hhea"].descent = 0

    font["OS/2"].sTypoAscender  = EM
    font["OS/2"].sTypoDescender = 0
    font["OS/2"].usWinAscent    = EM
    font["OS/2"].usWinDescent   = 0


    name = font["name"]

    def set_name(nameID, text):
        name.setName(text, nameID, 3, 1, 0x409)
        name.setName(text, nameID, 1, 0, 0)

    set_name(1, FAMILY)
    set_name(4, FAMILY)
    set_name(6, FAMILY)


    font.save(out_font)

    print("DONE", out_font)


# =====================================================
# standalone
# =====================================================
if __name__ == "__main__":
    BASE = os.path.dirname(__file__)

    run(
        os.path.join(BASE, "chunk_fonts"),
        os.path.join(BASE, "qatt.ttf")
    )