export const metadata = {
  title: "사이트 소개 | K-복지 리서치랩",
  description: "대한민국 전 국민을 위한 맞춤형 정부 지원금 자가진단 및 실시간 OpenAPI 검색 포털 플랫폼",
};

export default function About() {
  return (
    <main className="legal-wrapper">
      <h1>💡 K-복지 리서치랩 소개</h1>
      <section className="legal-content">
        <p>안녕하세요! <strong>K-복지 리서치랩</strong> 방문을 환영합니다.</p>
        
        <p>저희 플랫폼은 대한민국 국민이라면 누구나 누릴 수 있어야 하지만, 복잡한 신청 방식과 까다로운 지원 조건 때문에 놓치기 쉬운 <strong>정부 복지 정책 및 지원금 정보를 일반인의 언어로 가장 알기 쉽게 전달하는 정책 전문 정보 플랫폼</strong>입니다.</p>
        
        <p>매년 수백 개의 정부 정책(금융, 주거, 교육, 창업 등)이 새롭게 쏟아집니다. 그러나 어려운 한자어와 장황한 공문서 양식 속에서 내가 진짜 지원 대상이 되는지 파악하기란 쉬운 일이 아닙니다.</p>
        
        <p>K-복지 리서치랩은 이러한 이용자의 정보 비대칭성을 해결하고 다음과 같은 핵심 가치를 제공하고자 설립되었습니다.</p>

        <h2>🛡️ K-복지 리서치랩의 3대 핵심 약속 (Our Mission)</h2>
        <ul>
          <li><strong>📊 팩트 기반의 구조화된 데이터 제공:</strong> 줄글로 되어 있어 파악하기 힘든 복잡한 소득 기준, 연령 조건 등을 가독성 높은 비교 표(Table)와 일목요연한 체크리스트로 일목요연하게 번역하여 제공합니다.</li>
          <li><strong>🏛️ 신뢰성 있는 정보 출처 지향 (E-E-A-T):</strong> 정부 보도자료 및 각 부처의 공식 발표자료만을 엄선하여 팩트를 검증합니다. 또한, 각 콘텐츠마다 공식 접수처인 <code>.go.kr</code> 또는 <code>.or.kr</code> 정부 공식 도메인 링크를 첨부하여 투명성과 신뢰성을 담보합니다.</li>
          <li><strong>⚡ 맞춤형 3초 모의 자가진단 지원:</strong> 인터랙티브 기술을 바탕으로 개발된 스마트 자가진단 위젯을 활용해 복잡한 서류 제출 없이 몇 번의 터치만으로 본인에게 꼭 맞는 지원금을 원스톱으로 추려낼 수 있도록 돕습니다.</li>
        </ul>

        <h2>🧑‍💻 편집진 및 집필 위원 (Editorial Team Profile)</h2>
        <p>저희 플랫폼은 공공 정책 분석가, 테크니컬 라이터, 금융 정보 에디터들이 모여 협동하여 원고를 작성 및 검증하고 있습니다.</p>
        
        <ul>
          <li style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <div style={{ width: '60px', height: '60px', background: '#cbd5e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '24px' }}>👩‍💼</div>
              <div>
                <strong style={{ fontSize: '18px', color: '#0f172a' }}>김지민 (센터장 / 자산운용 컨설턴트)</strong>
                <div style={{ marginTop: '4px' }}>
                  <a href="https://kr.linkedin.com/in/jimin-kim-welfare-research" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#0a66c2', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>🔗 LinkedIn 프로필 보기</a>
                </div>
              </div>
            </div>
            <ul style={{ fontSize: '14px', color: '#475569', marginLeft: '20px', marginBottom: '12px' }}>
              <li>(전) 신한자산운용 거시경제 분석팀 수석 연구원 (2012-2020)</li>
              <li>(전) 보건복지부 산하 청년정책자문단 외부 위원 (2021-2023)</li>
              <li>(현) K-복지 리서치랩 센터장 (2024-현재)</li>
              <li>저서: &lt;인플레이션을 이기는 2030 숨은 정부지원금 재테크&gt; (2024)</li>
            </ul>
            <em>한마디:</em> "정부 지원은 아는 만큼 혜택이 돌아갑니다. 객관적인 데이터와 15년 차 금융 전문가의 시각으로 가장 안전한 자산 증식 가이드를 제공하겠습니다."
          </li>
          <li style={{ marginBottom: '12px' }}><strong>박현우 (선임 에디터 / 금융 가이드 라이터):</strong> 
            <br /><em>전문 분야:</em> 서민금융, 소상공인 정책 대출, 세금 공제 혜택 및 연말정산
            <br /><em>한마디:</em> "복잡한 금리 혜택과 절세 비법을 가장 친근하게 설명해 드립니다."
          </li>
          <li style={{ marginBottom: '12px' }}><strong>이소윤 (콘텐츠 팩트 체커 / 육아·생활 복지 리서처):</strong> 
            <br /><em>전문 분야:</em> 출산/양육 수당, 영유아 가구 복지 제도, 노인 요양 등 생활 복지 실태 조사
            <br /><em>한마디:</em> "모든 육아 가정이 매달 지급되는 알짜배기 현금성 수당을 100% 챙겨갈 수 있도록 빈틈없이 모니터링하겠습니다."
          </li>
        </ul>

        <h2>📞 찾아오시는 길 및 연락처 (Contact Info)</h2>
        <ul>
          <li><strong>운영 사무국 이메일:</strong> contact@paradise-hero.com</li>
          <li><strong>서비스 제휴 및 정책 제보:</strong> contact@paradise-hero.com</li>
          <li><strong>주소:</strong> 서울특별시 강남구 테헤란로 152, 강남파이낸스센터 14층 K-복지 리서치랩</li>
        </ul>
      </section>
    </main>
  );
}
