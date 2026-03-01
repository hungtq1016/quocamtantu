import cv2
import os
import svgwrite

def run(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    for file in os.listdir(input_dir):
        if not file.lower().endswith(".png"):
            continue

        print("Convert:", file)

        img = cv2.imread(os.path.join(input_dir, file), 0)
        _, thresh = cv2.threshold(img, 200, 255, cv2.THRESH_BINARY_INV)

        contours, hierarchy = cv2.findContours(
            thresh,
            cv2.RETR_CCOMP,
            cv2.CHAIN_APPROX_SIMPLE
        )

        h, w = img.shape
        dwg = svgwrite.Drawing(
            os.path.join(output_dir, file.replace(".png", ".svg")),
            size=(w, h)
        )

        for i, cnt in enumerate(contours):
            if cv2.contourArea(cnt) < 5:
                continue

            points = [(float(p[0][0]), float(p[0][1])) for p in cnt]
            parent = hierarchy[0][i][3]
            color = "white" if parent != -1 else "black"

            dwg.add(dwg.polygon(points, fill=color))

        dwg.save()

    print("PNG TO SVG DONE")