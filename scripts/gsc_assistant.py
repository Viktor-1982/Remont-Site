"""
GSC Assistant - Подключение к Microsoft Edge (CDP 9222)
"""
import sys
import json
from playwright.sync_api import sync_playwright

def check_connection():
    print("[*] Попытка подключения к Microsoft Edge на 127.0.0.1:9222...")
    try:
        with sync_playwright() as p:
            browser = p.chromium.connect_over_cdp("http://127.0.0.1:9222")
            contexts = browser.contexts
            if not contexts:
                print("[!] Браузер подключен, но нет открытых контекстов.")
                return False

            pages = contexts[0].pages
            print(f"[+] Успешное подключение! Найдено открытых вкладок: {len(pages)}")
            
            for i, page in enumerate(pages):
                try:
                    title = page.title()
                    url = page.url
                    print(f"  Вкладка #{i+1}: '{title}' -> {url}")
                except Exception as e:
                    print(f"  Вкладка #{i+1}: Ошибка чтения ({e})")
            
            # Ищем вкладку Google Search Console
            gsc_page = None
            for page in pages:
                if "search.google.com/search-console" in page.url:
                    gsc_page = page
                    break

            if gsc_page:
                print("\n[+] Найдена активная вкладка Google Search Console!")
                print(f"    URL: {gsc_page.url}")
                print(f"    Заголовок: {gsc_page.title()}")
            else:
                print("\n[i] Вкладка Search Console пока не открыта или выполняется вход.")
                
            return True
    except Exception as ex:
        print(f"[-] Не удалось подключиться к Edge: {ex}")
        print("    Убедитесь, что Edge запущен через Edge_AI.bat.")
        return False

if __name__ == "__main__":
    check_connection()
