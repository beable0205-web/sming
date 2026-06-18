export const metadata = {
  title: "사이트 소개 | K-복지 리서치랩",
  description: "대한민국 전 국민을 위한 맞춤형 정부 지원금 자가진단 및 실시간 정책 정보 포털 플랫폼. 보건복지부·국토교통부·고용노동부 등 정부 공식 자료만을 인용하여 팩트체크된 복지 정보를 제공합니다.",
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
          <li><strong>📊 팩트 기반의 구조화된 데이터 제공:</strong> 줄글로 되어 있어 파악하기 힘든 복잡한 소득 기준, 연령 조건 등을 가독성 높은 비교 표(Table)와 일목요연한 체크리스트로 번역하여 제공합니다.</li>
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
                <strong style={{ fontSize: '18px', color: '#0f172a' }}>김지민 (센터장 / 공공정책 리서처)</strong>
                <div style={{ marginTop: '4px' }}>
                  <a href="https://kr.linkedin.com/in/jimin-kim-welfare-research" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#0a66c2', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>🔗 LinkedIn 프로필 보기</a>
                </div>
              </div>
            </div>
            <ul style={{ fontSize: '14px', color: '#475569', marginLeft: '20px', marginBottom: '12px' }}>
              <li>(전) 보건복지부 산하 청년정책자문단 외부 위원</li>
              <li>(현) K-복지 리서치랩 센터장 (2024-현재)</li>
              <li>전문 분야: 복지제도 분석, 정책 데이터 리서치</li>
            </ul>
            <em>한마디:</em> &quot;정부 지원은 아는 만큼 혜택이 돌아갑니다. 공식 자료를 바탕으로 정확한 정책 정보를 전달하겠습니다.&quot;
          </li>
          <li style={{ marginBottom: '12px' }}><strong>박현우 (선임 에디터 / 복지 가이드 라이터):</strong> 
            <br /><em>전문 분야:</em> 서민금융, 소상공인 정책, 세금 공제 혜택 및 연말정산
            <br /><em>한마디:</em> &quot;복잡한 금융 혜택과 절세 비법을 가장 친근하게 설명해 드립니다.&quot;
          </li>
          <li style={{ marginBottom: '12px' }}><strong>이소윤 (콘텐츠 팩트 체커 / 육아·생활 복지 리서처):</strong> 
            <br /><em>전문 분야:</em> 출산/양육 수당, 영유아 가구 복지 제도, 노인 요양 등 생활 복지 실태 조사
            <br /><em>한마디:</em> &quot;모든 육아 가정이 매달 지급되는 알짜배기 현금성 수당을 100% 챙겨갈 수 있도록 빈틈없이 모니터링하겠습니다.&quot;
          </li>
        </ul>

        <h2>📋 편집 기준 및 정보 검증 프로세스</h2>
        <p>K-복지 리서치랩은 다음과 같은 엄격한 편집 기준을 준수합니다:</p>
        <ul>
          <li><strong>📌 공식 자료 의무 인용:</strong> 모든 정책 정보는 보건복지부, 국토교통부, 고용노동부, 금융위원회 등 정부 부처 공식 보도자료 또는 법령을 기반으로 작성됩니다.</li>
          <li><strong>🔄 업데이트 주기:</strong> 분기별 1회 이상 정기 검토를 실시하며, 주요 제도 변경 시 즉시 반영합니다.</li>
          <li><strong>✅ 팩트체크 절차:</strong> 초고 작성 → 2차 편집자 교차 검토 → 정부 공식 링크 재확인 → 발행의 4단계 프로세스를 거칩니다.</li>
          <li><strong>🔗 출처 명기:</strong> 모든 수치와 기준은 &quot;XXXX년 [부처명] 기준&quot; 형식으로 출처를 명기합니다.</li>
        </ul>

        <h2>📊 독자 활용 통계</h2>
        <ul>
          <li><strong>발행 아티클 수:</strong> 41개 이상 (복지·금융·청년·소상공인·의료 분야)</li>
          <li><strong>주요 커버리지:</strong> 기초생활보장, 근로장려금, 청년도약계좌, 주거급여, 장기요양보험 등 핵심 복지 제도 전반</li>
          <li><strong>정부 공식 링크:</strong> 모든 아티클에 .go.kr / .or.kr 도메인 신청처 링크 포함</li>
        </ul>

        <h2>🏛️ 정보 출처 목록 (주요 인용 기관)</h2>
        <ul>
          <li>보건복지부 (mohw.go.kr)</li>
          <li>국토교통부 (molit.go.kr)</li>
          <li>고용노동부 (moel.go.kr)</li>
          <li>금융위원회 (fsc.go.kr)</li>
          <li>소상공인시장진흥공단 (semas.or.kr)</li>
          <li>국민건강보험공단 (nhis.or.kr)</li>
          <li>국민연금공단 (nps.or.kr)</li>
          <li>서민금융진흥원 (kinfa.or.kr)</li>
          <li>한국노인인력개발원 (kordi.or.kr)</li>
          <li>여성가족부 (mogef.go.kr)</li>
          <li>중소벤처기업부 (mss.go.kr)</li>
          <li>국세청 홈택스 (hometax.go.kr)</li>
        </ul>

        <h2>⚠️ 면책 조항 (Disclaimer)</h2>
        <p style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '16px' }}>
          본 사이트의 모든 정보는 <strong>정보 제공 목적</strong>으로 작성되었으며, 법적 효력을 갖는 공식 안내가 아닙니다.
          각 지원 제도의 최종 신청 자격 확인, 지급액 결정, 신청 절차는 반드시 <strong>해당 정부 기관 및 공식 신청처를 통해 직접 확인</strong>하시기 바랍니다.
          정책은 예산·법령 개정에 따라 변경될 수 있으므로, 중요한 의사결정 전에는 최신 공식 자료를 확인하시기 바랍니다.
        </p>

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
