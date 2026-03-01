# Rime Mapping Generator

Tool tạo bảng ánh xạ sang QATT và tự lọc từ tiếng Việt có nghĩa.

---

## Cài đặt

Python 3.10+

Cài thư viện:

```python
pip install wordfreq
```
---

## Cấu trúc

- initials.json   -> phụ âm 
- finals.json     -> nguyên âm
- main.py  -> script chính

---

## Chạy
```python
python main.py
```
Kết qyar:
```
mapping.yaml
```
---

## Cách chỉnh vị trí

Chỉ cần sửa trong file:
```
initials.json
finals.json
```
Thứ tự trong file sẽ quyết định vị trí block Unicode.

---

## Nguyên lý

1. Sinh toàn bộ block mã
2. Convert Telex -> Unicode tiếng Việt
3. Dùng wordfreq lọc từ có nghĩa
4. Xuất file cuối

---

## Tuỳ chỉnh bộ lọc

Trong file main.py:

- MIN_ZIPF = 2.0 (default)
- Giảm xuống 1.5 -> nhiều từ hơn  
- Tăng lên 3.0 -> lọc từ vô nghĩa