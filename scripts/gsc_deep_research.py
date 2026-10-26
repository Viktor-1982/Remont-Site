"""
Deep GSC Research for renohacks.com via connected Edge CDP
"""
import time
import json
import os
from playwright.sync_api import sync_playwright

def research():
    output_dir = "C:/Users/Viktor/projects/repair-blog/scripts/gsc_data"
    os.makedirs(output_dir, exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.connect_over_cdp("http://127.0.0.1:9222")
        context = browser.contexts[0]
        
        # Find or use GSC page
        page = None
        for p_tab in context.pages:
            if "search.google.com/search-console" in p_tab.url:
                page = p_tab
                break
        
        if not page:
            page = context.new_page()
            page.goto("https://search.google.com/search-console?resource_id=sc-domain%3Arenohacks.com")
            
        print("[*] Активная страница:", page.url)
        page.wait_for_timeout(3000)
        
        # 1. Скриншот главной Overview
        overview_shot = os.path.join(output_dir, "overview.png")
        page.screenshot(path=overview_shot)
        print(f"[+] Скриншот Overview сохранен: {overview_shot}")
        
        # 2. Переходим в Performance (Эффективность)
        perf_url = "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Arenohacks.com"
        print("[*] Переходим в раздел Performance...")
        page.goto(perf_url)
        page.wait_for_timeout(4000)
        
        # Включаем все 4 метрики: Кнопки Total clicks, Total impressions, Average CTR, Average position
        # В интерфейсе GSC это обычно чекбоксы/чипы
        try:
            chips = page.query_selector_all("[role='button'], [role='checkbox'], .iSSf7d")
            for chip in chips:
                text = chip.inner_text().strip()
                if any(k in text for k in ["CTR", "Position", "Позиция", "Средняя позиция", "Average position", "Average CTR", "Средний CTR"]):
                    aria_checked = chip.get_attribute("aria-checked")
                    if aria_checked == "false":
                        chip.click()
                        time.sleep(1)
        except Exception as e:
            print("[!] Ошибка включения чипов:", e)
            
        page.wait_for_timeout(2000)
        
        perf_shot = os.path.join(output_dir, "performance.png")
        page.screenshot(path=perf_shot)
        print(f"[+] Скриншот Performance сохранен: {perf_shot}")
        
        # Читаем сводные цифры карточек (Клики, Показы, CTR, Позиция)
        summary_cards = []
        try:
            cards = page.query_selector_all(".m4D3dc, .K3b4ve, .O1vhre, .iSSf7d")
            for c in cards:
                t = c.inner_text().strip()
                if t:
                    summary_cards.append(t)
        except Exception as e:
            print("[!] Ошибка чтения карточек:", e)

        # Извлекаем таблицу поисковых запросов (Queries)
        queries_data = []
        try:
            # Находим строки таблицы
            rows = page.query_selector_all("table tbody tr, [role='row']")
            for r in rows:
                cells = [c.inner_text().strip() for c in r.query_selector_all("td, [role='cell'], [role='gridcell']")]
                if cells and len(cells) >= 2:
                    queries_data.append(cells)
        except Exception as e:
            print("[!] Ошибка чтения таблицы запросов:", e)

        # 3. Переходим в раздел Indexing (Страницы / Индексирование)
        index_url = "https://search.google.com/search-console/index?resource_id=sc-domain%3Arenohacks.com"
        print("[*] Переходим в раздел Indexing (Страницы)...")
        page.goto(index_url)
        page.wait_for_timeout(4000)
        
        index_shot = os.path.join(output_dir, "indexing.png")
        page.screenshot(path=index_shot)
        print(f"[+] Скриншот Indexing сохранен: {index_shot}")
        
        indexing_issues = []
        try:
            rows = page.query_selector_all("table tbody tr, [role='row']")
            for r in rows:
                cells = [c.inner_text().strip() for c in r.query_selector_all("td, [role='cell'], [role='gridcell']")]
                if cells:
                    indexing_issues.append(cells)
        except Exception as e:
            print("[!] Ошибка чтения причин неиндексирования:", e)
            
        report = {
            "summary_cards": summary_cards,
            "queries": queries_data[:25],
            "indexing_issues": indexing_issues[:20]
        }
        
        report_file = os.path.join(output_dir, "report.json")
        with open(report_file, "w", encoding="utf-8") as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
            
        print(f"[+] Отчет сохранен в {report_file}")
        return report

if __name__ == "__main__":
    research()
