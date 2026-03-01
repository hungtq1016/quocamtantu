# Build Font từ PNG

Code này dùng để build font `.ttf` từ ảnh PNG

---

# Yêu cầu

## 1. Python 3.10+

Cài thư viện:
```python
pip install opencv-python svgwrite svgpathtools fonttools
```
---

## 2. FontForge (bắt buộc)

Dùng để build font từ SVG.

Cài đặt FontForge:
https://fontforge.org

Sau khi cài, mở `main.py` và sửa đường dẫn:

FONTFORGE = r"C:\Program Files (x86)\FontForgeBuilds\bin\fontforge.exe"

Nếu máy bạn cài ở ổ đĩa khác -> sửa lại đường dẫn.

---

# Lưu ý
**Tên file phải đúng theo codepoint quy định**  
Trong thư mục **pngs** chứa các **glyph PNG** dùng để build font.  
Các file ảnh được ánh xạ trực tiếp vào **Unicode Private Use Area (PUA)**.
Nếu đặt sai tên hoặc sai thứ tự -> code sẽ map sai glyph và build font sẽ lỗi.
## Quy tắc đặt tên PNG

### Nguyên tắc chung

- Tên file = Unicode codepoint dạng hex
- Không thêm chữ, không tiền tố/hậu tố
- Không đổi thứ tự
- Không được thiếu file

✅ Đúng:
```
010009.png
010030.png
```
❌ Sai:
```
ng.png
glyph_010009.png
010009_ng.png
```
---

## Dấu thanh

Vị trí trong unicode:
```
U+010000 -> U+010007
```
Thứ tự:
```
0  huyền
1  ngã
2  nặng khứ
3  nặng nhập
4  ngang
5  hỏi
6  sắc khứ
7  sắc nhập
```
Ví dụ:
```
010000.png
010001.png
...
010007.png
```
---

## Phụ âm đầu

Vị trí trong unicode:
```
U+010008 -> U+01001D
```
Thứ tự giống mảng sau
```js
[
  "", "ng", "h", "g", "c", "l", "tr", "đ", "n", "t", "th", "nh", "ch",
  "d", "x", "kh", "s", "r", "m", "b", "v", "ph"
]
```
Ánh xạ:
```
""   -> 010008.png
ng   -> 010009.png
h    -> 01000A.png
g    -> 01000B.png
...
ph   -> 01001D.png
```
Ví dụ: ng là 010009.png

---

## Nguyên âm / vần (finals)

Vị trí trong unicode:
```
U+010030 -> U+01009D
```

Ví dụ:
```
oe   -> 010030.png
oan  -> 010031.png
ung  -> 010032.png
uy   -> 010033.png
...
oeo  -> 01009D.png
```

```js
[
    "oe","oan","ung","uy","âm",
    "e","an","ông","i","uâm",
    "oa","oeng","oen","ưa","em",
    "a","eng","en","ư","uôm",
    "uê","uênh","uơn","ơ","ôm",
    "ê","ênh","ơn","uơ","um",
    "âu","ưng","ai","ưn","om",
    "uâu","ooeng","oai","ươn","ơm",
    "ao","âng","ay","ăn","ươm",
    "oao","uâng","oay","oăn","uơm",
    "au","ăng","ơi","ân","êm",
    "oau","oăng","uơi","uân","im",
    "uông","iêng","ia","ên","iêm",
    "uưng","uyêng","uay","uên","am",
    "ương","anh","ây","iên","oam",
    "ang","oanh","uây","uyên","ăm",
    "oang","inh","ưi","in","oăm",
    "ong","uynh","ươi","uyn","ưm",
    "ô","ôn","ôi","ưu","ươu",
    "o","un","ui","iu","iêu",
    "ua","on","oi","êu","eo",
    "u","uôn","uôi","uêu","oeo"
]
```
---

## Điều quan trọng

- đặt tên đúng codepoint đã qui ước
- đủ file

## Nếu làm sai

Script build sẽ:
- crash khi build font
- lỗi font

# Cách chạy

## Bước 1 — vào đúng thư mục
```python
cd build_font_from_png
```
---

## Bước 2 — chạy toàn bộ pipeline
```python
python main.py
```
---

# Hoặc chạy từng bước

### PNG thành SVG
```python
python main.py png2svg
```
### Gộp SVG
```python
python main.py merge
```
### Chia chunks
```python
python main.py chunk
```
### Build chunk fonts (FontForge)
```python
python main.py font
```
### Gộp font cuối
```python
python main.py mergefont
```
---

# Kết quả

Sau khi chạy xong:

build_font_from_png/qatt.ttf

Đây là file font hoàn chỉnh.

---

# Lưu ý quan trọng

## KHÔNG chạy trực tiếp file con
Sai:
```python
python merge_svg.py
```
Đúng:
```python
python main.py merge
```
Vì toàn bộ tiến trình dùng main.py để quản lý đường dẫn.

---

## Không hardcode
Project dùng relative path.

---
