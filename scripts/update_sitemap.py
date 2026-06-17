import os
import glob
from datetime import datetime

SITEMAP_PATH = r"d:\report\public\sitemap.xml"
ARTICLES_DIR = r"d:\report\src\content\articles"
BASE_URL = "https://www.paradise-hero.com"

def generate_sitemap():
    print("Regenerating sitemap.xml...")
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    # 1. 고정 페이지 등록
    sitemap_entries = [
        f"""  <url>
    <loc>{BASE_URL}/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/about/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/api-center/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/privacy/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/terms/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>"""
    ]
    
    # 2. 마크다운 아티클 수집 및 등록
    md_files = glob.glob(os.path.join(ARTICLES_DIR, "*.md"))
    print(f"Found {len(md_files)} articles for sitemap.")
    
    for file_path in md_files:
        slug = os.path.splitext(os.path.basename(file_path))[0]
        # 파일 수정 시간 가져오기
        mtime = os.path.getmtime(file_path)
        lastmod = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")
        
        entry = f"""  <url>
    <loc>{BASE_URL}/articles/{slug}/</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>"""
        sitemap_entries.append(entry)
        
    # 3. XML 파일 쓰기
    xml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_entries)}
</urlset>
"""
    
    os.makedirs(os.path.dirname(SITEMAP_PATH), exist_ok=True)
    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(xml_content.strip())
        
    print(f"Successfully generated sitemap with {len(sitemap_entries)} URLs at {SITEMAP_PATH}")

if __name__ == "__main__":
    generate_sitemap()
