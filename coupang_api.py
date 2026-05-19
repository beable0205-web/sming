import os
import hmac
import hashlib
import time
import requests
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

ACCESS_KEY = "3793eab4-a000-4bc3-a659-0e9ee25478bc"
SECRET_KEY = "3f798e0e532b06c42748ed13de8e264f3d597b55"

def generate_hmac(method, uri, secret_key, access_key):
    datetime_str = time.strftime('%y%m%d', time.gmtime()) + 'T' + time.strftime('%H%M%S', time.gmtime()) + 'Z'
    message = datetime_str + method + uri
    signature = hmac.new(bytes(secret_key, "utf-8"),
                         message.encode("utf-8"),
                         hashlib.sha256).hexdigest()

    return f"CEA algorithm=HmacSHA256, access-key={access_key}, signed-date={datetime_str}, signature={signature}"

def get_goldbox_deals():
    method = "GET"
    uri = "/v2/providers/affiliate_open_api/apis/openapi/v1/products/goldbox"
    domain = "https://api-gateway.coupang.com"
    url = domain + uri

    authorization = generate_hmac(method, uri, SECRET_KEY, ACCESS_KEY)
    headers = {"Authorization": authorization, "Content-Type": "application/json"}
    
    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        if data.get("rCode") == "0" and "data" in data:
            # 최대 100개 상품 가져오기
            products = data["data"][:100]
            return products
        else:
            print("Coupang API Error:", data)
            return []
    except Exception as e:
        print("Exception:", e)
        return []

def ai_sourcing_agent(products):
    if not products or not GEMINI_API_KEY:
        print("🚨 상품이 없거나 GEMINI API 키가 없어 랜덤 소싱합니다.")
        return products[:3]

    print("🤖 AI 소싱 에이전트(MD)가 100개의 특가 상품을 분석 중입니다...")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"temperature": 0.2})
    
    # AI에게 보낼 상품 리스트 텍스트 만들기 (이름, 가격)
    product_text = ""
    for idx, p in enumerate(products):
        product_text += f"[{idx}] {p.get('productName')} - {p.get('productPrice')}원\n"
        
    prompt = f"""
    당신은 5070 시니어 여성(어머님들)을 주 고객층으로 삼는 최고의 쇼핑 MD입니다.
    오늘 쿠팡 골드박스 특가 상품 100개 중, 기저귀, 컴퓨터 부품, 10대 의류 등 어머님들과 전혀 무관한 '나쁜 상품'만 제외하고
    어머님들이 좋아하실 만한 '좋은 상품'을 **가능한 많이(최소 50개 이상)** 골라주세요.
    
    [고객 특징]
    - 건강, 미용, 관절, 갱년기 관련 상품을 매우 선호합니다. (이런 건 무조건 상위권에 배치)
    - 식료품(과일, 쌀, 간편식), 휴지, 세제 등 가성비 좋은 생필품을 좋아합니다.
    - 컴퓨터 부품, 게임기, 기저귀, 유아용품 등은 전혀 관심이 없으니 무조건 뺍니다.
    
    [상품 리스트]
    {product_text}
    
    위 리스트에서 추천하는 상품들의 번호(idx)를 고르되, **가장 추천하는 핵심 상품 3개를 배열의 맨 앞(0, 1, 2번째)에 배치**하고, 
    그 뒤로는 괜찮은 상품들의 인덱스를 쭉 나열하세요. (총 50~80개 정도가 될 것입니다)
    오직 아래와 같은 JSON 배열 형식으로만 응답하세요. 다른 설명은 절대 금지.
    예시: [12, 45, 87, 1, 2, 5, 8, 9, 10, 15, ...]
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace("```json", "").replace("```", "").strip()
        best_indices = json.loads(text)
        
        best_products = []
        for idx in best_indices:
            if 0 <= idx < len(products):
                best_products.append(products[idx])
                
        if not best_products:
            return products[:3]
            
        print(f"✅ AI 소싱 에이전트가 총 {len(best_products)}개의 쇼핑몰 전시용 상품을 엄선했습니다!")
        
        # 전체 추천 상품을 shop_data.json으로 저장 (shop.html 쇼핑몰 구성을 위해)
        with open("shop_data.json", "w", encoding="utf-8") as f:
            json.dump(best_products, f, ensure_ascii=False)
            
        # 1등 상품을 json 파일로 저장 (유튜브 커뮤니티 봇이 쓰도록)
        with open("best_product.json", "w", encoding="utf-8") as f:
            json.dump(best_products[0], f, ensure_ascii=False)
            
        # 홈페이지(index.html) 배너용으로는 최상위 3개만 반환
        return best_products[:3]
    except Exception as e:
        print(f"❌ AI 소싱 에이전트 에러: {e}")
        return products[:3]

def generate_html_snippet(products):
    if not products:
        return ""
    
    import json
    js_products = []
    for p in products:
        js_products.append({
            "name": p.get('productName', ''),
            "price": f"{p.get('productPrice', 0):,}",
            "image": p.get('productImage', ''),
            "link": p.get('productUrl', '')
        })
        
    js_array_str = json.dumps(js_products, ensure_ascii=False)
    
    html = f'''
<div id="coupang-deals-container" class="flex flex-col gap-3 w-full my-4"></div>
<script>
    (function() {{
        const coupangProducts = {js_array_str};
        
        function renderRandomDeals() {{
            const container = document.getElementById('coupang-deals-container');
            if (!container || coupangProducts.length === 0) return;
            
            // Shuffle and pick 3
            const shuffled = [...coupangProducts].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            
            let html = '';
            selected.forEach(p => {{
                html += `
                <a href="${{p.link}}" target="_blank" class="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-200 shadow-sm active:scale-95 transition-transform hover:border-red-400">
                    <img src="${{p.image}}" alt="상품" class="w-16 h-16 object-cover rounded-lg border border-gray-100">
                    <div class="flex flex-col justify-center flex-grow text-left">
                        <span class="text-[11px] text-white bg-red-500 rounded-sm px-1.5 py-0.5 w-max font-bold mb-1">오늘의 반값 특가</span>
                        <span class="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">${{p.name}}</span>
                        <span class="text-base font-extrabold text-[#D84315] mt-1">${{p.price}}원</span>
                    </div>
                </a>
                `;
            }});
            container.innerHTML = html;
        }}
        
        // Initial render
        renderRandomDeals();
        
        // Expose function globally so it can be called each time modal opens
        window.refreshCoupangDeals = renderRandomDeals;
    }})();
</script>
'''
    return html

def update_index_html():
    all_deals = get_goldbox_deals()
    
    # AI 소싱 에이전트를 통해 3개 엄선
    best_deals = ai_sourcing_agent(all_deals)
    
    html_snippet = generate_html_snippet(best_deals)
    
    if not html_snippet:
        print("No deals found, skipping update.")
        return
        
    filepath = "index.html"
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        start_marker = "<!-- COUPANG_GOLDBOX_START -->"
        end_marker = "<!-- COUPANG_GOLDBOX_END -->"
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            new_content = content[:start_idx + len(start_marker)] + "\n" + html_snippet + content[end_idx:]
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print("Successfully updated index.html with fresh Coupang deals.")
        else:
            print("Markers not found in index.html")
    except Exception as e:
        print("Failed to update index.html:", e)

if __name__ == "__main__":
    update_index_html()
