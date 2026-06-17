'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resultDatabase } from '../data/welfareData';

export default function WelfareFinder() {
  const [selections, setSelections] = useState({ step1: '', step2: '', step3: '' });
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (stepNum, val) => {
    const nextSelections = { ...selections, [`step${stepNum}`]: val };
    setSelections(nextSelections);

    setTimeout(() => {
      if (stepNum < 3) {
        setStep(stepNum + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleReset = () => {
    setSelections({ step1: '', step2: '', step3: '' });
    setStep(1);
    setShowResult(false);
  };

  const getResults = () => {
    const key = `${selections.step1}-${selections.step2}-${selections.step3}`;
    const fallbackKey = `${selections.step1}-${selections.step2}-low`;
    return resultDatabase[key] || resultDatabase[fallbackKey] || [
      { 
        title: '2026년 정부 통합 지원금 통합 캘린더', 
        desc: '매월 새롭게 발표되는 전 국민 정부 혜택 일정 가이드', 
        guideUrl: '/articles/youth-leap/',
        govUrl: 'https://www.gov.kr'
      }
    ];
  };

  const results = getResults();

  return (
    <section className="finder-section" id="finder">
      <div id="welfare-finder-container">
        <div className="wf-card">
          <div className="wf-header">
            <span className="wf-badge">Smart Welfare Search</span>
            <h2>💡 3초 만에 찾는 나의 정부 지원금</h2>
            <p>간단한 조건 선택으로 지금 바로 신청 가능한 혜택과 <strong>공식 정부 신청 링크</strong>까지 한 번에 확인하세요.</p>
          </div>
          
          <div className="wf-body">
            {!showResult ? (
              <>
                {/* Step 1: 연령대 선택 */}
                {step === 1 && (
                  <div className="wf-step active" id="step-1">
                    <label className="wf-label">1. 연령대를 선택해 주세요.</label>
                    <div className="wf-options-grid">
                      <button className={`wf-option-btn ${selections.step1 === 'youth' ? 'selected' : ''}`} onClick={() => handleSelect(1, 'youth')}>
                        <span className="wf-opt-icon">⚡</span>
                        <div>
                          <span className="wf-opt-title">만 19세 ~ 34세</span>
                          <span className="wf-opt-desc">대학생, 사회초년생, 청년층 대상 혜택</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step1 === 'middle' ? 'selected' : ''}`} onClick={() => handleSelect(1, 'middle')}>
                        <span className="wf-opt-icon">💼</span>
                        <div>
                          <span className="wf-opt-title">만 35세 ~ 59세</span>
                          <span className="wf-opt-desc">중장년층, 직장인, 가구주 대상 혜택</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step1 === 'senior' ? 'selected' : ''}`} onClick={() => handleSelect(1, 'senior')}>
                        <span className="wf-opt-icon">👴</span>
                        <div>
                          <span className="wf-opt-title">만 60세 이상</span>
                          <span className="wf-opt-desc">시니어, 연금 대상자, 실버 세대 혜택</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: 대상 구분 */}
                {step === 2 && (
                  <div className="wf-step active" id="step-2">
                    <label className="wf-label">2. 현재 본인의 상황에 해당하는 항목은?</label>
                    <div className="wf-options-grid">
                      <button className={`wf-option-btn ${selections.step2 === 'worker' ? 'selected' : ''}`} onClick={() => handleSelect(2, 'worker')}>
                        <span className="wf-opt-icon">🏢</span>
                        <div>
                          <span className="wf-opt-title">직장인 / 구직자</span>
                          <span className="wf-opt-desc">근로 소득이 있거나 현재 구직 중인 분</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step2 === 'business' ? 'selected' : ''}`} onClick={() => handleSelect(2, 'business')}>
                        <span className="wf-opt-icon">🏪</span>
                        <div>
                          <span className="wf-opt-title">소상공인 / 자영업자</span>
                          <span className="wf-opt-desc">개인 사업체를 운영 중이거나 예비 창업자</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step2 === 'parent' ? 'selected' : ''}`} onClick={() => handleSelect(2, 'parent')}>
                        <span className="wf-opt-icon">🍼</span>
                        <div>
                          <span className="wf-opt-title">육아 / 가구 구성원</span>
                          <span className="wf-opt-desc">자녀를 양육 중이거나 다자녀 가구에 해당</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step2 === 'housing' ? 'selected' : ''}`} onClick={() => handleSelect(2, 'housing')}>
                        <span className="wf-opt-icon">🏠</span>
                        <div>
                          <span className="wf-opt-title">주거 / 청약 (무주택자)</span>
                          <span className="wf-opt-desc">내집마련 및 전월세 안정이 필요한 가구</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: 소득 수준 */}
                {step === 3 && (
                  <div className="wf-step active" id="step-3">
                    <label className="wf-label">3. 대략적인 소득 기준을 선택해 주세요.</label>
                    <div className="wf-options-grid">
                      <button className={`wf-option-btn ${selections.step3 === 'low' ? 'selected' : ''}`} onClick={() => handleSelect(3, 'low')}>
                        <span className="wf-opt-icon">📉</span>
                        <div>
                          <span className="wf-opt-title">중위소득 100% 이하</span>
                          <span className="wf-opt-desc">기준 중위소득 이하 서민/지원 대상 가구</span>
                        </div>
                      </button>
                      <button className={`wf-option-btn ${selections.step3 === 'mid' ? 'selected' : ''}`} onClick={() => handleSelect(3, 'mid')}>
                        <span className="wf-opt-icon">📈</span>
                        <div>
                          <span className="wf-opt-title">중위소득 100% 초과</span>
                          <span className="wf-opt-desc">중위소득 초과 가구 또는 일반 소득층</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Result Section */
              <div className="wf-result" style={{ display: 'block' }}>
                <div className="wf-result-header">
                  <div className="wf-success-badge">🌈 분석 완료</div>
                  <h3>조건에 맞는 맞춤형 정부 지원금 목록</h3>
                  <p>상세 안내를 읽어보시거나, 공식 신청 페이지로 즉시 이동할 수 있습니다.</p>
                </div>
                
                <div className="wf-result-list">
                  {results.map((res, idx) => (
                    <div className="wf-card-item" key={idx}>
                      <div className="wf-item-header">
                        <span className="wf-item-title">👑 {res.title}</span>
                        <span className="wf-item-desc">{res.desc}</span>
                      </div>
                      <div className="wf-btn-group">
                        <Link href={res.guideUrl} className="wf-btn-guide">📘 상세 꿀팁 가이드</Link>
                        <a href={res.govUrl} target="_blank" rel="noopener noreferrer nofollow" className="wf-btn-gov" style={{ background: '#2563eb' }}>
                          🏛️ 정부 공식 신청처 이동 ➡️
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="wf-reset-btn" onClick={handleReset}>🔄 조건 다시 선택하고 진단하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
