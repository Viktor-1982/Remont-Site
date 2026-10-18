import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

def create_banner(input_image_path, output_path, title_text, question_text, lang="ru"):
    img = Image.open(input_image_path).convert("RGBA")
    w, h = img.size

    # Create dark gradient overlay for high contrast readability
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    
    # Fill with a soft dark vignette/scrim across the center and bottom
    for y in range(h):
        # Center-weighted dark scrim (0.45 to 0.70 opacity)
        rel_y = abs(y - h * 0.5) / (h * 0.5)
        alpha = int(140 + (1 - rel_y) * 60)
        draw_overlay.line([(0, y), (w, y)], fill=(12, 14, 18, min(230, alpha)))

    img_combined = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img_combined)

    # Fonts
    # Choose bold fonts from Windows Fonts
    font_path_serif = "C:/Windows/Fonts/georgiab.ttf"
    font_path_sans = "C:/Windows/Fonts/arialbd.ttf"
    if not os.path.exists(font_path_sans):
        font_path_sans = "C:/Windows/Fonts/arial.ttf"

    # VERY LARGE TEXT as requested
    # Title font ~ 4.5% of width, Question font ~ 5.5% of width
    title_size = int(w * 0.038)
    question_size = int(w * 0.052)
    accent_size = int(w * 0.024)

    font_title = ImageFont.truetype(font_path_sans, title_size)
    font_question = ImageFont.truetype(font_path_serif, question_size)
    font_accent = ImageFont.truetype(font_path_sans, accent_size)

    # Accent badge text
    badge_text = "● SENSORY ARCHITECTURE RESEARCH" if lang == "en" else "● ИССЛЕДОВАНИЕ НЕЙРОАРХИТЕКТУРЫ"

    # Measure texts
    # We want to center everything vertically and horizontally
    margin_x = int(w * 0.08)
    max_text_width = w - margin_x * 2

    # Helper to wrap text
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

    badge_bbox = font_accent.getbbox(badge_text)
    badge_h = badge_bbox[3] - badge_bbox[1]

    title_lines = wrap_text(title_text, font_title, max_text_width)
    title_line_h = int(title_size * 1.3)

    question_lines = wrap_text(question_text, font_question, max_text_width)
    question_line_h = int(question_size * 1.35)

    total_h = (
        badge_h + int(h * 0.03) +
        len(title_lines) * title_line_h + int(h * 0.04) +
        len(question_lines) * question_line_h
    )

    start_y = int((h - total_h) / 2)

    # Draw Badge
    badge_bbox = font_accent.getbbox(badge_text)
    badge_w = badge_bbox[2] - badge_bbox[0]
    badge_x = int((w - badge_w) / 2)
    draw.text((badge_x, start_y), badge_text, font=font_accent, fill=(234, 179, 8, 255)) # amber/gold

    current_y = start_y + badge_h + int(h * 0.035)

    # Draw Title (Uppercase, crisp white/off-white)
    for line in title_lines:
        bbox = font_title.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Drop shadow
        draw.text((lx + 2, current_y + 2), line, font=font_title, fill=(0, 0, 0, 220))
        draw.text((lx, current_y), line, font=font_title, fill=(225, 230, 238, 255))
        current_y += title_line_h

    current_y += int(h * 0.035)

    # Draw Divider line
    line_w = int(w * 0.15)
    line_x1 = int((w - line_w) / 2)
    line_x2 = line_x1 + line_w
    draw.line([(line_x1, current_y), (line_x2, current_y)], fill=(234, 179, 8, 200), width=3)

    current_y += int(h * 0.045)

    # Draw Question (Huge Serif, bright white, prominent hook)
    for line in question_lines:
        bbox = font_question.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Strong drop shadow
        draw.text((lx + 3, current_y + 3), line, font=font_question, fill=(0, 0, 0, 240))
        draw.text((lx, current_y), line, font=font_question, fill=(255, 255, 255, 255))
        current_y += question_line_h

    # Convert back to RGB and save
    final_img = img_combined.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95)
    print(f"Saved banner to {output_path}")

if __name__ == "__main__":
    base_img = "public/images/formula-uyuta/06-refuge-reading-nook.jpg"
    
    # Russian banner
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-ru.jpg",
        title_text="ФОРМУЛА УЮТА В 7 ПУНКТАХ",
        question_text="«Ваш дом лечит вашу нервную систему — или незаметно держит её в режиме выживания?»",
        lang="ru"
    )

    # English banner
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-en.jpg",
        title_text="THE FORMULA OF COZINESS: 7 SENSORY LAWS",
        question_text="\"Does your home truly restore you — or quietly keep your nervous system in survival mode?\"",
        lang="en"
    )
