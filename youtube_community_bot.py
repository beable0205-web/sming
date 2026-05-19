import os
import time
import datetime
import random
import re
from dotenv import load_dotenv
import google.generativeai as genai
from playwright.sync_api import sync_playwright
import hmac
import hashlib
import json
import requests
from time import gmtime, strftime

# ---------------------------------------------------------
# 환경 변수 및 설정
# ---------------------------------------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ★ 여기에 본인의 유튜브 채널 핸들(예: @goldenvoice94)을 입력하세요! ★
YOUTUBE_HANDLE = "@%EA%B9%80%EC%8C%A4%EC%9D%98%EC%98%81%EC%9B%85%EB%9D%BC%EB%94%94%EC%98%A4" 
SITE_URL = "https://paradise-hero.com"

# ---------------------------------------------------------
# 1. 쿠팡 파트너스 골드박스 상품 추출 (Data 페르소나 적용)
# ---------------------------------------------------------
def get_coupang_goldbox_link():
    access_key = os.getenv("COUPANG_ACCESS_KEY")
    secret_key = os.getenv("COUPANG_SECRET_KEY")
    
    fallback_title = "쿠팡 로켓배송 반값 특가"
    fallback_url = "https://influencers.coupang.com/s/paradisehero?subId=youtube_bot"
    
    if not access_key or not secret_key:
        print("⚠️ 쿠팡 API 키가 없습니다. 기본 링크를 사용합니다.")
        return fallback_title, fallback_url
        
    method = "GET"
    url = "/v2/providers/affiliate_open_api/apis/openapi/products/goldbox"
    
    datetime_str = strftime('%y%m%d', gmtime()) + 'T' + strftime('%H%M%S', gmtime()) + 'Z'
    message = datetime_str + method + url
    signature = hmac.new(bytes(secret_key, "utf-8"), message.encode("utf-8"), hashlib.sha256).hexdigest()
    
    authorization = f"CEA algorithm=HmacSHA256, access-key={access_key}, signed-date={datetime_str}, signature={signature}"
    domain = "https://api-gateway.coupang.com"
    full_url = domain + url + "?subId=youtube_bot"
    
    headers = {
        "Authorization": authorization,
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(full_url, headers=headers)
        data = response.json()
        if data.get("rCode") == "0" and data.get("data"):
            # 랜덤으로 골드박스 상품 1개 선택
            product = random.choice(data["data"][:5]) 
            return product["productName"], product["productUrl"]
    except Exception as e:
        print("Coupang API 에러:", e)
        
    return fallback_title, fallback_url

# ---------------------------------------------------------
# 2. AI 멘트 생성 함수 (C-3PO 카피라이터 페르소나 적용)
# ---------------------------------------------------------
def generate_community_post():
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY가 없습니다. .env 파일을 확인해주세요.")
        return None

    genai.configure(api_key=GEMINI_API_KEY)
    
    # temperature를 올려서 창의성과 다양성 극대화
    model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"temperature": 0.9})
    
    now = datetime.datetime.now()
    time_str = now.strftime("%Y년 %m월 %d일 %H시 %M분")
    
    # 매번 다른 스타일의 글이 나오도록 랜덤 콘셉트 부여
    concepts = [
        "영웅님의 노래 한 구절이나 무대를 회상하며 감동적으로 시작하기",
        "건강에 대한 유머러스하고 친근한 조언(물 마시기, 스트레칭 등)으로 시작하기",
        "현재 날씨나 계절감(햇살, 바람 등)을 한 편의 시처럼 구체적으로 묘사하며 시작하기",
        "팬덤 파라다이스의 단합력과 사랑을 칭찬하며 텐션을 높이는 느낌으로 시작하기",
        "따뜻한 차나 식사를 챙기셨는지 물으며 다정하고 편안하게 시작하기"
    ]
    concept = random.choice(concepts)
    
    # 쿠팡 다이나믹 상품 가져오기
    cp_title, cp_url = get_coupang_goldbox_link()
    
    prompt = f"""
    당신은 가수 황영웅님을 열렬히 응원하는 5070 시니어 팬덤의 리더 '김쌤'이자 탁월한 심리 마케터입니다.
    오늘 유튜브 커뮤니티 게시판에 올릴 짧고 감동적인 응원 멘트를 작성해주세요.
    
    [현재 시간]: {time_str}
    [오늘의 특별 작성 콘셉트]: {concept}
    [오늘의 쿠팡 추천 상품]: {cp_title}
    
    [조건]
    1. [오늘의 특별 작성 콘셉트]를 첫 부분에 강하게 반영하여 매번 똑같은 패턴의 인사를 피하세요.
    2. 글 중간에 황영웅님에 대한 열정적인 응원을 자연스럽게 녹여내세요.
    3. 글 마지막에는 **반드시** 아래 문구와 링크들을 그대로 포함하세요. 팬들이 돈을 쓰지 않고도 응원방을 후원할 수 있다는 '강력한 명분'을 심어주는 것이 핵심입니다.
    
       👇 [필수] 오늘의 스밍/투표 미션하러 가기 👇
       {SITE_URL}
       
       🎁 팬님! 오늘 장보실 일 있으신가요? 🎁
       아래 링크에서 [{cp_title}] 또는 필요한 생필품을 구경만 하셔도, 
       팬님은 1원도 손해보지 않지만 영웅님 1위 투표 활동비가 저희에게 후원됩니다!
       👇 0원으로 영웅님 1위 만들기 동참하기 👇
       {cp_url}
       
    4. 길이는 인사말 포함 5~7문장 정도로 임팩트 있게 작성하세요.
    5. 친근하고 예의 바른 '해요체/합쇼체'를 사용하고, 이모티콘(🎵, 💚, ☕ 등)을 적절히 섞어주세요.
    """
    
    print("AI 멘트 생성 중...")
    response = model.generate_content(prompt)
    post_text = response.text.strip()
    return post_text

# ---------------------------------------------------------
# 2. 플레이라이트(Playwright) 자동 포스팅 함수
# ---------------------------------------------------------
def post_to_youtube_community(post_text):
    # 크롬 사용자 데이터(쿠키)를 저장할 로컬 폴더
    user_data_dir = os.path.join(os.getcwd(), "youtube_profile")
    
    print("브라우저를 시작합니다...")
    with sync_playwright() as p:
        # headless=False 로 하면 화면이 보임. (처음 로그인할 때는 보여야 함)
        # 평소 스케줄러로 돌릴 때는 headless=True 로 바꿔도 되지만, 유튜브는 창을 띄우는 것이 안전함.
        browser = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            channel="chrome", # 시스템에 설치된 실제 크롬 사용
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = browser.new_page()
        
        # 1. 내 채널 커뮤니티 탭으로 바로 이동 (리다이렉트 방해 방지)
        community_url = f"https://www.youtube.com/{YOUTUBE_HANDLE}/community"
        print(f"커뮤니티 탭으로 이동 중: {community_url}")
        
        try:
            page.goto(community_url, wait_until="domcontentloaded")
        except Exception:
            print("리다이렉션 방해 발생, 다시 시도합니다...")
            time.sleep(2)
            page.goto(community_url, wait_until="domcontentloaded")
            
        time.sleep(3)
        
        # 2. 로그인 여부 확인
        login_button = page.locator("a[href^='https://accounts.google.com/ServiceLogin']")
        if login_button.count() > 0:
            print("==================================================")
            print("🚨 로그인이 필요합니다!")
            print("브라우저 창에서 직접 유튜브에 로그인해주세요.")
            print("로그인이 완료되면 이 창에서 엔터를 누르세요...")
            print("==================================================")
            input("로그인 완료 후 엔터 누르기: ")
            
            # 로그인 완료 후 다시 커뮤니티 탭으로 확실히 이동
            page.goto(community_url)
            time.sleep(5)
        
        try:
            # 3. 글 작성 입력창 클릭
            # 유튜브 UI 구조에 따라 선택자(Selector)가 다를 수 있음
            input_box = page.locator("#placeholder-area")
            input_box.click()
            time.sleep(1)
            
            # 실제 텍스트가 들어가는 에디터 요소
            editor = page.locator("#contenteditable-root").nth(0)
            editor.fill(post_text)
            print("멘트를 입력했습니다.")
            time.sleep(2)
            
            # 4. 게시 버튼 클릭
            submit_button = page.locator("ytd-button-renderer#submit-button")
            submit_button.click()
            print("✅ 게시글 등록 버튼을 클릭했습니다!")
            time.sleep(5) # 등록될 때까지 대기
            
        except Exception as e:
            print("게시 과정에서 오류가 발생했습니다. 핸들이 정확한지, 커뮤니티 탭이 활성화되어 있는지 확인하세요.")
            print(e)
            # 오류 확인을 위해 30초 대기
            time.sleep(30)
            
        print("브라우저를 종료합니다.")
        browser.close()

if __name__ == "__main__":
    if YOUTUBE_HANDLE == "@여기에_유튜브_핸들을_입력하세요":
        print("🚨 스크립트 상단의 YOUTUBE_HANDLE 값을 본인의 유튜브 핸들로 변경해주세요!")
    else:
        text = generate_community_post()
        if text:
            print("\n--- 오늘 등록할 멘트 ---")
            print(text)
            print("------------------------\n")
            post_to_youtube_community(text)
