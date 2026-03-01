import os
import fontforge
import psMat


# =====================================================
# MAIN
# =====================================================
def run(chunks_dir, out_dir):

    EM = 1000
    BASE_START = 0x010100

    XPAD = 50
    AUTOSAVE_EVERY = 500

    os.makedirs(out_dir, exist_ok=True)


    # ---------------- helpers ----------------
    def is_tone(code):
        return 0x010000 <= code <= 0x010007


    def get_vertical_layout(code):
        if code < BASE_START:
            return EM, 0

        idx = (code - BASE_START) % 9

        if idx == 0:
            return int(EM * 0.8), int(EM * 0.1)

        if idx in [2, 3, 6, 7]:
            return int(EM * 0.9), int(EM * 0.1)

        return int(EM * 0.9), 0


    # ---------------- build each chunk ----------------
    for chunk in sorted(os.listdir(chunks_dir)):

        folder = os.path.join(chunks_dir, chunk)
        if not os.path.isdir(folder):
            continue

        print(f"\n=== BUILD CHUNK {chunk} ===")

        font = fontforge.font()
        font.encoding = "UnicodeFull"
        font.em = EM

        font.familyname = "qatt"
        font.fullname  = "qatt"
        font.fontname  = "qatt"

        count = 0

        for file in os.listdir(folder):

            if not file.endswith(".svg"):
                continue

            try:
                code = int(os.path.splitext(file)[0], 16)

                g = font.createChar(code)
                g.importOutlines(os.path.join(folder, file))

                g.removeOverlap()
                g.correctDirection()

                xmin, ymin, xmax, ymax = g.boundingBox()
                w = xmax - xmin
                h = ymax - ymin

                if w <= 0 or h <= 0:
                    continue

                target_h, bottom_offset = get_vertical_layout(code)
                usable_w = EM - 2 * XPAD

                if not is_tone(code):
                    scale_x = usable_w / w
                    scale_y = target_h / h
                    g.transform(psMat.scale(scale_x, scale_y))

                xmin, ymin, xmax, ymax = g.boundingBox()

                dx = XPAD - xmin
                dy = bottom_offset - ymin

                g.transform(psMat.translate(dx, dy))

                g.width = EM
                g.round()

                count += 1

                if count % AUTOSAVE_EVERY == 0:
                    print(f"  built {count} glyphs... last U+{code:04X}")

            except Exception as e:
                print("ERROR at", file, e)


        out = os.path.join(out_dir, chunk + ".ttf")

        font.generate(out)
        font.close()

        print(f"DONE {chunk} | {count} glyphs -> {out}")


# =====================================================
# standalone for fontforge -script
# =====================================================
if __name__ == "__main__":
    BASE = os.path.dirname(__file__)
    run(
        os.path.join(BASE, "chunks"),
        os.path.join(BASE, "chunk_fonts")
    )