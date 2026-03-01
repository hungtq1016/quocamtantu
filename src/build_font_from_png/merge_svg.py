import os
from svgpathtools import svg2paths

# =====================================================
# MAIN FUNCTION
# =====================================================
def run(svg_dir, out_dir):

    os.makedirs(out_dir, exist_ok=True)

    EM = 1000
    MERGE_RATIO = 1
    TONE_RATIO  = 0.1
    GAP = 2

    HALF_W  = EM * 0.5
    MERGE_H = EM * MERGE_RATIO
    TONE_H  = EM * TONE_RATIO

    CONS_START, CONS_END = 0x010008, 0x01001D
    VOW_START,  VOW_END  = 0x010030, 0x01009D
    TONE_START = 0x010000
    OUT_START  = 0x010100


    # ---------------- helpers ----------------
    def load_svg(code):
        f = os.path.join(svg_dir, f"{code:06X}.svg")
        if not os.path.exists(f):
            return None
        return svg2paths(f)[0]


    def bbox(paths):
        xs, ys = [], []
        for p in paths:
            xmin,xmax,ymin,ymax = p.bbox()
            xs += [xmin,xmax]
            ys += [ymin,ymax]
        return min(xs),min(ys),max(xs),max(ys)


    def fit_box(paths, bw, bh, ox, oy):
        xmin,ymin,xmax,ymax = bbox(paths)
        w,h = xmax-xmin, ymax-ymin
        s = min(bw/w, bh/h)

        out=[]
        for p in paths:
            out.append(p.translated(complex(-xmin,-ymin)).scaled(s))

        xmin,ymin,xmax,ymax = bbox(out)
        w,h = xmax-xmin, ymax-ymin

        tx = ox + (bw-w)/2
        ty = oy + (bh-h)/2

        return [p.translated(complex(tx,ty)) for p in out]


    def fit_height(paths, th):
        xmin,ymin,xmax,ymax = bbox(paths)
        s = th/(ymax-ymin)
        return [p.translated(complex(-xmin,-ymin)).scaled(s) for p in paths]


    def save_svg(paths, filename):
        xmin, ymin, xmax, ymax = bbox(paths)

        w = xmax - xmin
        h = ymax - ymin

        s = min(EM / w, EM / h)

        scaled = [p.translated(complex(-xmin, -ymin)).scaled(s) for p in paths]

        xmin2, ymin2, xmax2, ymax2 = bbox(scaled)
        w2 = xmax2 - xmin2
        h2 = ymax2 - ymin2

        tx = (EM - w2) / 2
        ty = (EM - h2) / 2

        final_paths = [p.translated(complex(tx, ty)) for p in scaled]

        parts = [
            f'<path d="{p.d()}" fill="black" stroke="none"/>'
            for p in final_paths
        ]

        svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {EM} {EM}">
{"".join(parts)}
</svg>'''

        with open(filename, "w", encoding="utf-8") as f:
            f.write(svg)


    # ---------------- build ----------------
    print("Merging SVGs...")

    tones = [load_svg(t) for t in range(TONE_START, TONE_START+8)]

    count = 0
    base_y = (EM-MERGE_H)/2

    for cons in range(CONS_START, CONS_END+1):

        c = load_svg(cons)
        if not c: continue

        for vow in range(VOW_START, VOW_END+1):

            v = load_svg(vow)
            if not v: continue

            left  = fit_box(c, HALF_W, MERGE_H, 0, base_y)
            right = fit_box(v, HALF_W, MERGE_H, HALF_W, base_y)

            base = left + right

            uni = OUT_START + count
            save_svg(base, os.path.join(out_dir, f"{uni:06X}.svg"))
            count += 1

            for idx, tone_paths in enumerate(tones):

                if not tone_paths:
                    continue

                tone = fit_height(tone_paths, TONE_H)

                xmin,ymin,xmax,ymax = bbox(tone)
                tw, th = xmax-xmin, ymax-ymin

                bxmin, bymin, bxmax, bymax = bbox(base)

                pos = idx % 4

                if pos == 0:
                    tx, ty = bxmin - tw - GAP, bymax + GAP
                elif pos == 1:
                    tx, ty = bxmin - tw - GAP, bymin - th - GAP
                elif pos == 2:
                    tx, ty = bxmax + GAP, bymin - th - GAP
                else:
                    tx, ty = bxmax + GAP, bymax + GAP

                tone_final = [p.translated(complex(tx,ty)) for p in tone]

                merged = base + tone_final

                uni = OUT_START + count
                save_svg(merged, os.path.join(out_dir, f"{uni:06X}.svg"))

                count += 1

    print("DONE Generated:", count)


# =====================================================
# allow standalone run
# =====================================================
if __name__ == "__main__":
    run(r"svgs", r"merged_svgs")