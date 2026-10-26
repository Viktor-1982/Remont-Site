# Project Rules for Renohacks (repair-blog)

Here are the project-specific rules, guidelines, and architectural standards for **Renohacks.com** (`repair-blog`). Always follow these rules when developing, editing code, or writing content for this project:

## 🌐 Next.js 15 & Contentlayer Architecture
- **Framework**: Next.js 15 (App Router) with TypeScript and Contentlayer (`contentlayer.config.ts`).
- **Bilingual Structure**:
  - English is the default locale served at the root URL (e.g., `/`, `/posts/[slug]`, `/calculators`). Never add an `/en` prefix to URLs.
  - Russian is served under the `/ru` prefix (e.g., `/ru`, `/ru/posts/[slug]`, `/ru/calculators`, `/ru/smety`).
  - Middleware handles locale routing and redirects cleanly (`middleware.ts`).
- **Content Organization**:
  - Russian MDX articles: `content/posts/*.mdx`
  - English MDX articles: `content/posts/en/*.mdx`
  - MDX frontmatter must always include: `title`, `description`, `date`, `tags`, `cover`, `author`, `rubric`, `series`, and `draft`.
- **Components & Styling**:
  - Tailwind CSS with strict semantic utility classes.
  - Clean separation: Interactive client components (`'use client'`) must remain isolated from server-rendered MDX layout and metadata.

## 🌍 Global English Content Standards (USA, Europe, Singapore)
- **Combined Global Localization**: When writing articles, guides, or calculators in English, target an international audience by combining United States (USA), European, and Singaporean (Asian) practices.
- **Dual Measurements**: Always provide dual measurements across all English text and calculator results. Use Imperial units (`sq ft`, `inches`, `lbs`, `gallons`) as primary, followed immediately by Metric units (`sq m`, `mm`, `kg`, `liters`) in parentheses:
  - *Example*: `Spread self-leveling underlayment at a depth of 1/4 in (6 mm) over a 150 sq ft (14 sq m) room`.
- **Cross-Regional Building Practices**: Compare regional standards where relevant so the reader gets contextually accurate guidance:
  - *Subfloors & Screed*: US 50 lb (22.7 kg) bags of Self-Leveling Underlayment (SLU) over wood subfloors vs. European 25 kg bags of cement screed over concrete slabs.
  - *Drywall Framing*: US 16" on-center wood stud framing with 1/2" (12.7 mm) drywall vs. European 600 mm on-center steel profile framing (Knauf standards) with 12.5 mm plasterboard.
  - *Tile & Mortar*: US modified thin-set mortar and 1/4" notched trowels vs. European C2TE cementitious tile adhesives.
- **Tone & Spelling**: Use standard American English spelling and professional contractor/architect terminology (*drywall*, *screed*, *framing*, *caulk*, *subfloor*).

## 📸 Anti-AI Photorealism Standard for Construction & Renovation
- **Elimination of Synthetic "3D Render" Artifacts**:
  - Never generate glossy, sterile, hyper-smooth "architectural renders" where walls lack texture, joints are invisible, and surfaces look like plastic toys.
  - Construction materials must display real-world tactile physics: subtle plaster trowel marks, tile grout bevels, authentic wood grain direction, concrete micro-porosity, and matte finishes.
- **Optical & Lighting Directives**:
  - `Shot on Leica M11 with 35mm f/2 Summicron lens` / `Sony A7R V with 24-70mm f/2.8 GM lens`.
  - `Natural diffused window daylight, authentic directional cast shadows, unretouched job-site capture, raw candid editorial framing`.
  - Prohibited prompt buzzwords: `photorealistic`, `8k`, `hyperrealistic`, `octane render`, `unreal engine`, `cinematic render`, `3d model`.

## 🧮 Construction Calculators & Accuracy Standards
- **Zero-Guesswork Mathematics**: All material consumption calculators (tile, screed, paint, drywall, cable, adhesive) must use verified engineering formulas with standard waste factors:
  - Add 5–10% contingency for straight cuts and standard tile patterns.
  - Add 10–15% contingency for diagonal tile layouts, complex herringbone, or high-loss drywall configurations.
- **Unit Precision**: Support real-time toggling between Imperial (feet/inches) and Metric (meters/mm) with clean roundings (no floating point precision noise like `14.285714`).

## 🛡️ E-E-A-T & Safety Protocol for Home Improvement
- **Strict Contractor Safety**: Never publish reckless DIY advice. Always mandate safety protocols:
  - Breaker shutoff and multimeter testing before electrical work.
  - Strict prohibition against cutting or grooving structural load-bearing concrete walls or columns.
  - Hydro-isolation curing times before tiling in wet zones (bathrooms, balconies).
- **Standards Grounding**: Reference recognized building standards where applicable (Knauf documentation, ANSI/TCNA tile standards, ASTM, and DIN/EN norms).
