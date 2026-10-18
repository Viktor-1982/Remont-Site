import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

def create_banner(input_image_path, output_path, title_text, subtitle_text, lang="ru"):
    img = Image.open(input_image_path).convert("RGBA")
    w, h = img.size

    # Enhance warm tones slightly
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.12)

    # Warm gradient overlay (warm dark espresso tones, letting light & flower breathe)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    
    for y in range(h):
        rel_y = abs(y - h * 0.5) / (h * 0.5)
        alpha = int(135 + (1 - rel_y) * 60)
        draw_overlay.line([(0, y), (w, y)], fill=(18, 14, 12, min(220, alpha)))

    img_combined = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img_combined)

    # Fonts
    font_path_title = "C:/Windows/Fonts/georgiab.ttf"
    if not os.path.exists(font_path_title):
        font_path_title = "C:/Windows/Fonts/arialbd.ttf"
    
    font_path_subtitle = "C:/Windows/Fonts/georgiai.ttf"
    if not os.path.exists(font_path_subtitle):
        font_path_subtitle = "C:/Windows/Fonts/arial.ttf"

    # Precise typography sizing:
    # Title: Very large, punchy
    # Subtitle: Clean, concise, secondary
    title_size = int(w * 0.058)
    subtitle_size = int(w * 0.032)

    font_title = ImageFont.truetype(font_path_title, title_size)
    font_subtitle = ImageFont.truetype(font_path_subtitle, subtitle_size)

    margin_x = int(w * 0.08)
    max_text_width = w - margin_x * 2

    def wrap_text(text, font, max_width):
        words = text.split()
        lines = []
        current_line = []
        for word in words:
            test_line = " ".join(current_line + [word])
            bbox = font.getbbox(test_line)
            line_w = bbox[2] - bbox[0]
            if line_w <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(" ".join(current_line))
                    current_line = [word]
                else:
                    lines.append(word)
        if current_line:
            lines.append(" ".join(current_line))
        return lines

    title_lines = wrap_text(title_text, font_title, max_text_width)
    title_line_h = int(title_size * 1.30)

    subtitle_lines = wrap_text(subtitle_text, font_subtitle, max_text_width)
    subtitle_line_h = int(subtitle_size * 1.35)

    spacing_title_to_line = int(h * 0.045)
    spacing_line_to_subtitle = int(h * 0.040)

    total_h = (
        len(title_lines) * title_line_h +
        spacing_title_to_line +
        spacing_line_to_subtitle +
        len(subtitle_lines) * subtitle_line_h
    )

    start_y = int((h - total_h) / 2)

    current_y = start_y

    # 1. Draw Title (Large, brilliant white with soft deep shadow)
    for line in title_lines:
        bbox = font_title.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Deep drop shadow
        draw.text((lx + 3, current_y + 3), line, font=font_title, fill=(10, 8, 6, 230))
        draw.text((lx + 1, current_y + 1), line, font=font_title, fill=(35, 20, 10, 180))
        # Crisp white text
        draw.text((lx, current_y), line, font=font_title, fill=(255, 255, 255, 255))
        current_y += title_line_h

    current_y += spacing_title_to_line

    # 2. Draw Subtle Amber Divider
    line_w = int(w * 0.14)
    line_x1 = int((w - line_w) / 2)
    line_x2 = line_x1 + line_w
    draw.line([(line_x1, current_y), (line_x2, current_y)], fill=(245, 185, 66, 230), width=3)

    current_y += spacing_line_to_subtitle

    # 3. Draw Subtitle (Warm luminous cream, italic, elegant)
    for line in subtitle_lines:
        bbox = font_subtitle.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Soft shadow
        draw.text((lx + 2, current_y + 2), line, font=font_subtitle, fill=(10, 8, 6, 210))
        # Warm cream text
        draw.text((lx, current_y), line, font=font_subtitle, fill=(240, 232, 218, 255))
        current_y += subtitle_line_h

    final_img = img_combined.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95)
    print(f"Saved banner to {output_path}")

if __name__ == "__main__":
    base_img = "public/images/formula-uyuta/mid-article-banner-warm-base.jpg"
    
    # Russian version
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-ru.jpg",
        title_text="ФОРМУЛА УЮТА В 7 ПРАВИЛАХ",
        subtitle_text="Сенсорная архитектура живого дома",
        lang="ru"
    )

    # English version
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-en.jpg",
        title_text="THE FORMULA OF COZINESS: 7 RULES",
        subtitle_text="Sensory architecture for a living home",
        lang="en"
    )
