import os
import shutil

def run(src, dst, root_svg_dir, chunk_size=1000):
    os.makedirs(dst, exist_ok=True)

    files = sorted([f for f in os.listdir(src) if f.endswith(".svg")])

    # ===== split merged =====
    for i in range(0, len(files), chunk_size):
        folder = os.path.join(dst, f"chunk_{i//chunk_size:03}")
        os.makedirs(folder, exist_ok=True)

        for f in files[i:i+chunk_size]:
            shutil.copy(os.path.join(src, f), os.path.join(folder, f))

    # ===== add root chunk =====
    root_folder = os.path.join(dst, "chunk_root")
    os.makedirs(root_folder, exist_ok=True)

    for f in os.listdir(root_svg_dir):
        if f.endswith(".svg"):
            shutil.copy(
                os.path.join(root_svg_dir, f),
                os.path.join(root_folder, f)
            )

    print("Chunks created + chunk_root added")