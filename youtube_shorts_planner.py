import os
import random
from dotenv import load_dotenv
import google.generativeai as genai

# ---------------------------------------------------------
# 환경 변수 및 설정
# ---------------------------------------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

SITE_URL = "https://paradise-hero.com"

# ---------------------------------------------------------
# Viral PD & Fandom Psychologist 페르소나 적용 쇼츠 기획봇
# ---------------------------------------------------------
def generate_shorts_script():
    if not GEMINI_API_KEY or GEMINI_API_KEY == "여기에_API_키를_입력하세요":
        print("🚨 GEMINI_API_KEY가 유효하지 않습니다. .env 파일을 확인해주세요.")
        return None

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"temperature": 0.85})
    
    # 5070 트롯 팬덤의 심리를 자극하는 쇼츠 후킹(Hooking) 콘셉트
    concepts = [
        "영웅님의 무명 시절이나 힘들었던 과거를 극복한 감동적인 스토리",
        "영웅님의 압도적인 성량이나 레전드 무대 하이라이트 (시원한 가창력 강조)",
        "영웅님이 팬들을 챙기는 다정하고 따뜻한 인성 일화 (심쿵 포인트)",
        "다른 트로트 가수들과 차별화되는 영웅님만의 독보적인 중저음 보이스 분석",
        "팬들이라면 무조건 공감할 수밖에 없는 '영웅님 입덕 포인트'"
    ]
    concept = random.choice(concepts)
    
    prompt = f"""
    당신은 5070 시니어 트로트 팬덤의 심리를 완벽하게 꿰뚫어보는 유튜브 쇼츠(Shorts) 전문 기획자이자 '김쌤'입니다.
    가수 황영웅님의 매력을 폭발시켜 시청자를 파라다이스 홈페이지({SITE_URL})로 유입시키는 30~60초 분량의 유튜브 쇼츠 대본을 작성해주세요.

    [오늘의 핵심 쇼츠 콘셉트]: {concept}

    [작성 가이드라인]
    1. **화면(비디오) / 나레이션(오디오) / 자막** 을 명확히 구분해서 대본 형식으로 써주세요.
    2. 처음 3초 안에 5070 어머님들의 시선을 확 사로잡는 강력한 후킹(Hooking) 멘트를 넣으세요.
    3. 팬덤이 상업성을 느끼지 않도록, 철저히 '순수하게 영웅님을 응원하고 사랑하는 팬의 마음'으로 작성해야 합니다. (장사꾼 느낌 절대 금지)
    4. **[핵심 퍼널 유도]** 영상의 마지막 부분(아웃트로)과 고정 댓글 지시사항에는 반드시 아래와 같은 흐름을 넣어주세요:
       "영웅님을 사랑하신다면, 지금 바로 고정 댓글의 '파라다이스 응원방' 링크를 눌러 매일매일 투표에 동참해주세요! 우리 손으로 1위 만들어줍시다!"
    5. 고정 댓글에 들어갈 텍스트도 함께 작성해주세요. (여기에 {SITE_URL} 링크를 포함하세요)
    
    대본을 구체적이고 감동적으로 작성해주세요!
    """
    
    print(f"🎬 [콘셉트: {concept}]\nAI 쇼츠 대본을 기획하고 있습니다...")
    response = model.generate_content(prompt)
    return response.text.strip()

if __name__ == "__main__":
    script = generate_shorts_script()
    if script:
        print("\n========================================================")
        print("💡 [파라다이스 Viral PD] 오늘의 추천 쇼츠(Shorts) 기획안")
        print("========================================================")
        print(script)
        print("========================================================\n")
