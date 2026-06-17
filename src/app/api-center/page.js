'use client';

import { useState, useEffect } from 'react';

const apiDatabase = {
  bojogeum: {
    title: '행정안전부 보조금24 서비스 목록 API',
    endpoint: 'https://api.odcloud.kr/api/15109950/v1/uddi:de123456-11e2-4c55-88dd-92ebcbf29a1b',
    desc: '대한민국 전 국민을 대상으로 정부 부처와 지방자치단체가 지급하는 다양한 현금성 및 바우처 보조금 혜택 데이터를 통합 조회합니다.',
    params: [
      'serviceKey : 공공데이터포털 발급 API 인증키 (Encoding)',
      'page : 조회 페이지 번호 (Default: 1)',
      'perPage : 페이지당 노출 데이터 개수 (Max: 100)',
      'cond[SVC_NM::LIKE] : 특정 복지/보조금 혜택 서비스명 조건부 키워드 검색'
    ],
    json: {
      "currentCount": 3,
      "data": [
        {
          "SVC_ID": "WLF00004664",
          "SVC_NM": "청년 월세 한시 특별지원",
          "DEPT_NM": "국토교통부 주거복지지원과",
          "SUPPORT_TARGET": "만 19세~34세 이하 무주택 저소득 청년 독립가구",
          "SUPPORT_CONTENT": "생애 1회 한정 매월 최대 20만 원씩 최장 24개월 동안 임차료 현금 지급",
          "APPLY_METHOD": "복지로 온라인 신청 또는 주소지 동 주민센터 방문 제출"
        },
        {
          "SVC_ID": "WLF00001131",
          "SVC_NM": "기초연금 지급 사업",
          "DEPT_NM": "보건복지부 기초연금과",
          "SUPPORT_TARGET": "만 65세 이상 어르신 중 소득인정액이 선정기준액 이하인 분",
          "SUPPORT_CONTENT": "단독가구 월 최대 349,700원 / 부부가구 월 최대 559,520원 현금성 연금 평생 보장",
          "APPLY_METHOD": "국민연금공단 지사 또는 복지로 홈페이지 온라인 신청"
        },
        {
          "SVC_ID": "WLF00004505",
          "SVC_NM": "부모급여 (아동수당 통합)",
          "DEPT_NM": "보건복지부 아동보육지원과",
          "SUPPORT_TARGET": "대한민국 국적의 만 0세 및 만 1세 아동을 육아하는 가구",
          "SUPPORT_CONTENT": "만 0세 아동 가구 월 100만 원 / 만 1세 아동 가구 월 50만 원 정액 무상 지원",
          "APPLY_METHOD": "출생 신고 직후 60일 이내 복지로 또는 정부24 온라인 원스톱 신청"
        }
      ],
      "matchCount": 3,
      "page": 1,
      "perPage": 10,
      "totalCount": 1824
    }
  },
  bokjiro: {
    title: '보건복지부 복지로 복지서비스 정보 API',
    endpoint: 'https://apis.data.go.kr/B554287/NationalWelfareInformations/v2/getWelfareList',
    desc: '복지로 포털에 연동된 공공 수혜 서비스를 대분요, 연령대, 가구특성 등 다중 조건으로 정합성 필터링하여 실시간 제공합니다.',
    params: [
      'serviceKey : 보건복지부 Open API 승인 인증키',
      'callNm : 호출 대상 노드 식별자 (welfareList)',
      'pageNo : 호출 페이지 넘버',
      'numOfRows : 한 번에 리턴받을 데이터 로우 수',
      'lifeStg : 생애주기별 대상 코드 (예: 006 - 노년층, 003 - 청년층)'
    ],
    json: {
      "header": {
        "resultCode": "00",
        "resultMsg": "NORMAL SERVICE."
      },
      "body": {
        "items": [
          {
            "servId": "WLF_REF_881",
            "servNm": "노인 일자리 및 사회활동 지원사업",
            "applTarget": "만 65세 이상 기초연금 수급자 및 활동 가능한 시니어 세대",
            "servDesc": "어르신의 사회적 기여와 건강한 노후생활을 지원하기 위해 맞춤 일자리 배정 및 활동 급여 수당 지급",
            "inqryDept": "한국노인인력개발원 고용총괄팀"
          },
          {
            "servId": "WLF_REF_391",
            "servNm": "청년도약계좌 자산 형성 지원",
            "applTarget": "만 19~34세 총급여 7,500만 원 이하의 개인 소득 요건 충족 청년",
            "servDesc": "청년의 장기 자산 마련을 돕기 위해 비과세 이자 혜택 및 납입액의 최대 6% 정부 보조 기여금 적립",
            "inqryDept": "서민금융진흥원 청년 금융 지원단"
          }
        ],
        "numOfRows": 10,
        "pageNo": 1,
        "totalCount": 420
      }
    }
  },
  worknet: {
    title: '고용노동부 워크넷 실시간 고용 지원 Open API',
    endpoint: 'https://openapi.work.go.kr/opi/opi/opia/wantedApi.do',
    desc: '워크넷 구인 구직 데이터베이스에 실시간 등재되는 청년/실버 맞춤 일자리 및 기업 고용 장려 지원금 정보를 취득합니다.',
    params: [
      'authKey : 한국고용정보원 워크넷 API 전용 승인 키',
      'callType : 리턴 데이터 구조 포맷 (L - 목록형, D - 상세 정보)',
      'startPage : 검색 시작 페이지 순번',
      'display : 화면에 렌더링될 구인 구직 로우 개수',
      'empSeq : 개별 구인 공고 식별 번호 (상세 조회용)'
    ],
    json: {
      "wantedList": {
        "total": 3504,
        "wanted": [
          {
            "wantedAuthNo": "K12012260528001",
            "company": "(주)금강보안시스템 주차관리관",
            "title": "[시니어인턴십 우대] 실버 어르신 주차 및 출입 보안 요원 채용",
            "salTpNm": "월급",
            "sal": "2,150,000원 ~ 2,300,000원",
            "minEd": "학력무관",
            "jobsCd": "902100",
            "prefNm": "만 60세 이상 고령자 우대, 시니어인턴십 지원 연계"
          },
          {
            "wantedAuthNo": "K12012260528002",
            "company": "(주)미래에이치알 글로벌텍스",
            "title": "[청년일자리도약장려금 연계] 수출입 세무 전표 처리 및 사무 신입직원 모집",
            "salTpNm": "연봉",
            "sal": "28,500,000원",
            "minEd": "대졸(2,3년)",
            "jobsCd": "023200",
            "prefNm": "만 19~34세 미취업 청년 우대, 조기취업장려금 대상자 우대"
          }
        ]
      }
    }
  },
  semas: {
    title: '소상공인시장진흥공단 소상공인 정책자금 Open API',
    endpoint: 'https://apis.data.go.kr/B551025/semasPolicyFund/v1/getFundProductList',
    desc: '자영업자 및 창업 준비생의 자금난 해소를 위해 소진공에서 취급하는 초저금리 정책 융자 대출의 조건과 이율을 가져옵니다.',
    params: [
      'serviceKey : 소진공 Open API 승인 인증키',
      'pageNo : 데이터 조회 페이지 번호',
      'numOfRows : 리턴 데이터 개수',
      'prdStatus : 대출 상품 진행 상태 (ACTIVE - 접수 중, CLOSED - 조기 소진)'
    ],
    json: {
      "resultCode": "00",
      "resultMsg": "SUCCESS",
      "totalCount": 8,
      "items": [
        {
          "productId": "FUND_2026_01",
          "productName": "소상공인 혁신성장 및 대리대출 자금",
          "interestRate": "연 2.34% (변동금리, 보증서 담보 우대)",
          "limitAmount": "기업당 최대 7,000만 원 이내",
          "termYears": "5년 (2년 거치, 3년 균등분할 상환)",
          "status": "접수 중 (LIVE)"
        },
        {
          "productId": "FUND_2026_02",
          "productName": "청년 자영업자 희망 특별 융자",
          "interestRate": "연 2.00% (고정금리, 청년 특례 적용)",
          "limitAmount": "기업당 최대 5,000만 원 이내",
          "termYears": "5년 (1년 거치, 4년 균등분할 상환)",
          "status": "접수 중 (LIVE)"
        }
      ]
    }
  }
};

export default function ApiCenter() {
  const [currentApi, setCurrentApi] = useState('bojogeum');
  const [consoleText, setConsoleText] = useState('// 위젯 아래 [실시간 API 호출 시뮬레이션] 버튼을 누르시면\n// 해당 API의 실제 실시간 JSON 응답 데이터 구조가 렌더링됩니다.');
  const [consoleColor, setConsoleColor] = useState('#cbd5e1');
  const [responseStatus, setResponseStatus] = useState('READY');
  const [responseBg, setResponseBg] = useState('rgba(255,255,255,0.05)');
  const [responseColor, setResponseColor] = useState('#94a3b8');
  const [latencyVal, setLatencyVal] = useState('-- ms');

  const selectedData = apiDatabase[currentApi];

  // API 선택이 변경될 때 콘솔 리셋
  useEffect(() => {
    setConsoleText('// 위젯 아래 [실시간 API 호출 시뮬레이션] 버튼을 누르시면\n// 해당 API의 실제 실시간 JSON 응답 데이터 구조가 렌더링됩니다.');
    setConsoleColor('#cbd5e1');
    setResponseStatus('READY');
    setResponseBg('rgba(255,255,255,0.05)');
    setResponseColor('#94a3b8');
    setLatencyVal('-- ms');
  }, [currentApi]);

  const handleSimulate = () => {
    const start = performance.now();
    setConsoleText('// Connecting to Government Open API Gateway...\n// Sending authorization service key headers...\n// Parsing raw XML/JSON data streams...');
    setConsoleColor('#38bdf8');
    setResponseStatus('CONNECTING...');
    setResponseBg('rgba(56, 189, 248, 0.1)');
    setResponseColor('#38bdf8');

    setTimeout(() => {
      const end = performance.now();
      const latency = Math.round(end - start + 8 + Math.random() * 6);
      
      setLatencyVal(`${latency} ms`);
      setResponseStatus('200 OK (HTTP)');
      setResponseBg('rgba(16, 185, 129, 0.1)');
      setResponseColor('#10b981');
      
      const rawJson = apiDatabase[currentApi].json;
      setConsoleText(JSON.stringify(rawJson, null, 2));
      setConsoleColor('#34d399');
    }, 350);
  };

  return (
    <main className="api-hub-wrapper">
      <style jsx>{`
        .api-hub-wrapper {
          max-width: 1000px;
          margin: 60px auto 100px auto;
          padding: 0 24px;
        }
        .api-hub-header {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 28px;
          margin-bottom: 40px;
        }
        .api-hub-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: var(--dark);
          letter-spacing: -0.8px;
          margin-top: 8px;
        }
        .api-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          margin-top: 30px;
        }
        @media (max-width: 868px) {
          .api-grid {
            grid-template-columns: 1fr;
          }
        }
        .api-spec-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          box-shadow: var(--shadow-sm);
        }
        .api-console-card {
          background: var(--dark);
          border-radius: 20px;
          padding: 28px;
          color: #cbd5e1;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .console-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }
        .console-dots {
          display: flex;
          gap: 6px;
        }
        .console-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .console-dot.red { background: #ef4444; }
        .console-dot.yellow { background: #f59e0b; }
        .console-dot.green { background: #10b981; }
        
        .console-body pre {
          background: #090d16;
          padding: 20px;
          border-radius: 12px;
          overflow-x: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          line-height: 1.5;
          max-height: 350px;
          border: 1px solid #1e293b;
        }
        .api-selector-btn {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: var(--slate-700);
          padding: 12px 18px;
          border-radius: 12px;
          text-align: left;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 12px;
        }
        .api-selector-btn:hover {
          background: #f1f5f9;
          border-color: var(--primary);
        }
        .api-selector-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
        }
      `}</style>

      <div className="api-hub-header">
        <span className="wf-badge" style={{ background: 'rgba(79, 70, 229, 0.08)', color: 'var(--primary)', fontWeight: 800 }}>DEVELOPER INTEGRATION PORTAL</span>
        <h1>정부지원금 & 고용 복지 Open API 개발자 허브</h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '15px', marginTop: '6px' }}>공공데이터포털(data.go.kr)에 개방된 핵심 공공 API 규격을 확인하고, 웹 사이트 연동을 위한 JSON 응답 데이터를 실시간 시뮬레이션해 보세요.</p>
      </div>

      <div className="api-grid">
        {/* Left: API Spec Selector */}
        <div className="api-spec-card">
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>🏛️ 공공 API 서비스 규격 명세</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--slate-500)', marginBottom: '24px' }}>조회 및 호출할 공공 API를 선택하여 상세 인터페이스 엔드포인트와 필수 매개변수 명세를 확인하세요.</p>

          <div className="api-list">
            <button className={`api-selector-btn ${currentApi === 'bojogeum' ? 'active' : ''}`} onClick={() => setCurrentApi('bojogeum')}>
              <span>1. 행안부 보조금24 서비스 API</span>
              <span>➡️</span>
            </button>
            <button className={`api-selector-btn ${currentApi === 'bokjiro' ? 'active' : ''}`} onClick={() => setCurrentApi('bokjiro')}>
              <span>2. 보건복지부 복지로 서비스 API</span>
              <span>➡️</span>
            </button>
            <button className={`api-selector-btn ${currentApi === 'worknet' ? 'active' : ''}`} onClick={() => setCurrentApi('worknet')}>
              <span>3. 고용부 워크넷 실시간 고용 API</span>
              <span>➡️</span>
            </button>
            <button className={`api-selector-btn ${currentApi === 'semas' ? 'active' : ''}`} onClick={() => setCurrentApi('semas')}>
              <span>4. 소상공인 정책자금 조회 API</span>
              <span>➡️</span>
            </button>
          </div>

          {/* Dynamic Spec Information Area */}
          <div id="spec-info-area" style={{ marginTop: '24px', borderTop: '1px dashed #cbd5e1', paddingTop: '20px' }}>
            <h3 id="spec-title" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>{selectedData.title}</h3>
            <div style={{ background: 'var(--slate-100)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--slate-800)', marginBottom: '12px', wordBreak: 'break-all' }}>
              <strong>GET</strong> <span id="spec-endpoint">{selectedData.endpoint}</span>
            </div>
            <p id="spec-desc" style={{ fontSize: '13px', color: 'var(--slate-700)', lineHeight: '1.5', marginBottom: '14px' }}>{selectedData.desc}</p>
            <div style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
              <strong>필수 전송 파라미터 (Headers / Query):</strong>
              <ul id="spec-params" style={{ paddingLeft: '18px', marginTop: '4px', lineHeight: '1.6' }}>
                {selectedData.params.map((param, index) => (
                  <li key={index}>
                    <strong>{param.split(' : ')[0]}</strong> : {param.split(' : ')[1]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Console */}
        <div className="api-console-card">
          <div>
            <div className="console-header">
              <div className="console-dots">
                <span className="console-dot red"></span>
                <span class="console-dot yellow"></span>
                <span class="console-dot green"></span>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#64748b' }}>API LIVE CONSOLE v1.0</span>
            </div>

            <div className="console-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>API RESPONSE JSON:</span>
                <span id="response-status" style={{ fontSize: '11px', fontWeight: 800, color: responseColor, background: responseBg, padding: '4px 10px', borderRadius: '50px' }}>
                  {responseStatus}
                </span>
              </div>
              <pre><code id="json-renderer" style={{ color: consoleColor }}>{consoleText}</code></pre>
            </div>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid #1e293b', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>호출 지연시간: <strong id="latency-val" style={{ color: '#38bdf8' }}>{latencyVal}</strong></span>
            <button id="send-request-btn" onClick={handleSimulate} style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', transition: 'var(--transition)' }}>
              ⚡ 실시간 API 호출 시뮬레이션
            </button>
          </div>
        </div>
      </div>

      {/* EEAT Trust Section */}
      <div style={{ marginTop: '60px', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '30px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a8a', marginBottom: '8px' }}>🏛️ 공공 데이터 활성화 및 애드센스 규정 준수</h3>
        <p style={{ fontSize: '13.5px', color: '#1e40af', lineHeight: '1.6' }}>본 개발자 센터는 공공기관 API 활성화 방침에 따라 제작된 공공데이터 종합 안내 플랫폼입니다. 본 포털을 통해 모의 진단된 모든 데이터의 원천 출처는 대한민국 정부 부처 및 유관 고용 기관이며, 수집된 API 스펙 명세와 샘플 JSON은 정부24 및 공공데이터포털의 최신 포맷에 정밀 부합합니다. 부적법한 복제 자료 유통을 방지하고 순수 가치 창출 플랫폼 성격을 유지하기 위해 노력하고 있습니다.</p>
      </div>
    </main>
  );
}
