import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

def create_banner(input_image_path, output_path, main_question_text, secondary_thought_text, lang="ru"):
    img = Image.open(input_image_path).convert("RGBA")
    w, h = img.size

    # Boost warmth slightly to ensure a deep golden cozy mood
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.15)

    # Create warm dark gradient overlay (rich warm espresso/charcoal tones: 20, 16, 14)
    # Allows the warm lamp glow and the flowering plant to peek through beautifully
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    
    for y in range(h):
        # Slightly heavier in center and lower thirds for pristine text readability
        rel_y = abs(y - h * 0.5) / (h * 0.5)
        # alpha from 135 at top/bottom to 195 in the center
        alpha = int(140 + (1 - rel_y) * 65)
        draw_overlay.line([(0, y), (w, y)], fill=(20, 16, 14, min(225, alpha)))

    img_combined = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img_combined)

    # Fonts
    font_path_serif_bold = "C:/Windows/Fonts/georgiab.ttf"
    font_path_serif_italic = "C:/Windows/Fonts/georgiai.ttf"
    font_path_sans_bold = "C:/Windows/Fonts/arialbd.ttf"
    font_path_sans = "C:/Windows/Fonts/arial.ttf"

    if not os.path.exists(font_path_serif_bold):
        font_path_serif_bold = "C:/Windows/Fonts/timesbd.ttf"
    if not os.path.exists(font_path_serif_italic):
        font_path_serif_italic = "C:/Windows/Fonts/timesi.ttf"

    # HIERARCHY:
    # 1. Main Heading with Question: VERY LARGE (Dominant)
    # 2. Secondary thought: Distinctly smaller
    question_size = int(w * 0.054)
    secondary_size = int(w * 0.032)
    badge_size = int(w * 0.020)

    font_question = ImageFont.truetype(font_path_serif_bold, question_size)
    font_secondary = ImageFont.truetype(font_path_sans, secondary_size)
    font_badge = ImageFont.truetype(font_path_sans_bold, badge_size)

    # Accent badge text
    badge_text = "● EVIDENCE-BASED DESIGN & SENSORY RESEARCH" if lang == "en" else "● ДОКАЗАТЕЛЬНЫЙ ДИЗАЙН И НЕЙРОАРХИТЕКТУРА"

    # Margins and wrap
    margin_x = int(w * 0.075)
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

    badge_bbox = font_badge.getbbox(badge_text)
    badge_h = badge_bbox[3] - badge_bbox[1]

    question_lines = wrap_text(main_question_text, font_question, max_text_width)
    question_line_h = int(question_size * 1.32)

    secondary_lines = wrap_text(secondary_thought_text, font_secondary, max_text_width)
    secondary_line_h = int(secondary_size * 1.35)

    # Spacings
    spacing_badge_to_question = int(h * 0.035)
    spacing_question_to_line = int(h * 0.04)
    spacing_line_to_secondary = int(h * 0.035)

    total_h = (
        badge_h + spacing_badge_to_question +
        len(question_lines) * question_line_h + spacing_question_to_line +
        spacing_line_to_secondary +
        len(secondary_lines) * secondary_line_h
    )

    start_y = int((h - total_h) / 2)

    # 1. Draw Badge (Warm Amber/Gold)
    badge_w = badge_bbox[2] - badge_bbox[0]
    badge_x = int((w - badge_w) / 2)
    draw.text((badge_x, start_y), badge_text, font=font_badge, fill=(245, 185, 66, 255))

    current_y = start_y + badge_h + spacing_badge_to_question

    # 2. Draw Main Question (VERY LARGE, crisp brilliant white with soft warm drop shadow)
    for line in question_lines:
        bbox = font_question.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Deep drop shadow
        draw.text((lx + 3, current_y + 3), line, font=font_question, fill=(10, 8, 6, 230))
        draw.text((lx + 1, current_y + 1), line, font=font_question, fill=(40, 25, 15, 200))
        # Foreground
        draw.text((lx, current_y), line, font=font_question, fill=(255, 255, 255, 255))
        current_y += question_line_h

    current_y += spacing_question_to_line

    # 3. Draw Gold Accent Divider
    line_w = int(w * 0.16)
    line_x1 = int((w - line_w) / 2)
    line_x2 = line_x1 + line_w
    draw.line([(line_x1, current_y), (line_x2, current_y)], fill=(245, 185, 66, 220), width=3)

    current_y += spacing_line_to_secondary

    # 4. Draw Secondary Thought (SLIGHTLY SMALLER, soft warm off-white/cream)
    for line in secondary_lines:
        bbox = font_secondary.getbbox(line)
        lw = bbox[2] - bbox[0]
        lx = int((w - lw) / 2)
        # Drop shadow
        draw.text((lx + 2, current_y + 2), line, font=font_secondary, fill=(10, 8, 6, 200))
        # Foreground: warm cream
        draw.text((lx, current_y), line, font=font_secondary, fill=(235, 230, 220, 255))
        current_y += secondary_line_h

    # Save high-quality JPEG
    final_img = img_combined.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95)
    print(f"Saved warm banner to {output_path}")

if __name__ == "__main__":
    base_img = "public/images/formula-uyuta/mid-article-banner-warm-base.jpg"
    
    # Russian banner: Large question heading, smaller secondary thought
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-ru.jpg",
        main_question_text="«Ваш дом восстанавливает ваши силы — или незаметно держит в режиме выживания?»",
        secondary_thought_text="Формула уюта в 7 пунктах: почему мозг не верит глянцевым каталогам и чего на самом деле просят наши чувства",
        lang="ru"
    )

    # English banner: Large question heading, smaller secondary thought
    create_banner(
        base_img,
        "public/images/formula-uyuta/mid-article-banner-en.jpg",
        main_question_text="“Does your home truly restore you — or quietly keep your nervous system in survival mode?”",
        secondary_thought_text="The Formula of Coziness: 7 sensory rules why the brain rejects glossy catalogs and what our senses crave",
        lang="en"
    )
