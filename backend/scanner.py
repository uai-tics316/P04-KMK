from PIL import Image, ImageOps
import pytesseract
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_from_image(image_file):
    image = Image.open(image_file)
    image = ImageOps.exif_transpose(image)
    image = image.convert("RGB")

    text = pytesseract.image_to_string(image)

    return text


def extract_possible_card_name(text):
    lines = text.split("\n")

    clean_lines = []

    for line in lines:
        line = line.strip()

        if len(line) >= 3:
            clean_lines.append(line)

    if len(clean_lines) == 0:
        return ""

    first_line = clean_lines[0]

    first_line = re.sub(
        r"[^a-zA-Z0-9 éÉáÁíÍóÓúÚñÑ-]",
        "",
        first_line
    )

    return first_line