"""Режет иконки сайта из одного исходника.

Кладёшь новый квадратный логотип в assets/img/logo.png (лучше 1080×1080)
и запускаешь из корня репозитория:

    pip install pillow
    python3 tools/icons.py

Скрипт перезапишет favicon.ico и все PNG-размеры, на которые ссылается
<head> в index.html и site.webmanifest. Вектор assets/favicon.svg он не
трогает — он нарисован руками, под новый знак его правят отдельно.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets" / "img" / "logo.png"

# размер -> куда положить. 48 и 96 нужны Google (он хочет кратное 48),
# 180 — иконка iOS «на экран Домой», 192/512 — site.webmanifest.
PNGS = {
    48: ROOT / "assets" / "favicon-48.png",
    96: ROOT / "assets" / "favicon-96.png",
    180: ROOT / "assets" / "apple-touch-icon.png",
    192: ROOT / "assets" / "icon-192.png",
    512: ROOT / "assets" / "icon-512.png",
}
ICO = ROOT / "favicon.ico"


def main():
    src = Image.open(SOURCE).convert("RGB")
    if src.width != src.height:
        raise SystemExit(f"{SOURCE.name} должен быть квадратным, а он {src.width}×{src.height}")

    for size, path in PNGS.items():
        src.resize((size, size), Image.LANCZOS).save(path, optimize=True)
        print("написал", path.relative_to(ROOT))

    src.resize((48, 48), Image.LANCZOS).save(ICO, sizes=[(16, 16), (32, 32), (48, 48)])
    print("написал", ICO.relative_to(ROOT))


if __name__ == "__main__":
    main()
