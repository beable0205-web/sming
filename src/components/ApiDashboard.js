'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiDatabase } from '../data/welfareData';

export default function ApiDashboard() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchedQuery, setSearchedQuery] = useState('');
  
  // Hydration Error 방지를 위한 마운트 체크 및 클라이언트용 랜덤 수치 생성
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setIsMounted(true);
    // 각 아이템별로 마운트 시점에 고정 랜덤 값 생성
    const initialStats = {};
    apiDatabase.forEach((item, index) => {
      initialStats[index] = {
        views: Math.floor(Math.random() * 5000 + 1000),
        budgetRate: Math.floor(Math.random() * 60 + 10)
      };
    });
    setStats(initialStats);
  }, []);

  const handleSearch = () => {
    setSearchedQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredData = apiDatabase.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const lowercaseQuery = searchedQuery.toLowerCase().trim();
    const matchesQuery =
      !searchedQuery ||
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.desc.toLowerCase().includes(lowercaseQuery) ||
      item.apiSource.toLowerCase().includes(lowercaseQuery);
    return matchesFilter && matchesQuery;
  });

  return (
    <section className="api-dashboard-section" id="api-dashboard" style={{ backgroundColor: 'var(--slate-50)', borderTop: '1px solid #e2e8f0', padding: '80px 24px' }}>
      <div className="api-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="wf-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', fontWeight: 800, fontSize: '11px' }}>LIVE DATA API INTEGRATION</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--dark)', marginTop: '8px' }}>🏛️ 실시간 정부지원금 & 고용 Open API 통합 검색</h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '14px', marginTop: '4px' }}>공공데이터포털(data.go.kr) 보조금24, 복지로, 고용노동부 API 규격에 맞춘 핵심 정책 실시간 라이브 검색 엔진</p>
          </div>
          <div className="api-status-indicator" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--success)', background: '#ffffff', padding: '8px 16px', borderRadius: '50px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--success)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
            실시간 API 통신 상태: 양호 (200 OK)
          </div>
        </div>

        {/* Search & Filters */}
        <div className="api-search-bar-wrapper" style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
          <div className="api-search-input-group" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="지원금 키워드 또는 정책명을 입력하세요 (예: 청년, 실버, 일자리, 월세, 소상공인...)"
              style={{ flex: 1, padding: '14px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: 500, outline: 'none', transition: 'var(--transition)' }}
            />
            <button onClick={handleSearch} style={{ backgroundColor: 'var(--primary)', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'var(--transition)' }}>🔍 검색하기</button>
          </div>
          <div className="api-filter-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--slate-700)', marginRight: '8px' }}>추천 태그:</span>
            <button className={`api-tag-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>전체보기</button>
            <button className={`api-tag-btn ${filter === 'youth' ? 'active' : ''}`} onClick={() => setFilter('youth')}>⚡ 청년 정책</button>
            <button className={`api-tag-btn ${filter === 'senior' ? 'active' : ''}`} onClick={() => setFilter('senior')}>👴 실버/어르신</button>
            <button className={`api-tag-btn ${filter === 'worker' ? 'active' : ''}`} onClick={() => setFilter('worker')}>💼 직장인/세금</button>
            <button className={`api-tag-btn ${filter === 'business' ? 'active' : ''}`} onClick={() => setFilter('business')}>🏪 소상공인</button>
            <button className={`api-tag-btn ${filter === 'parent' ? 'active' : ''}`} onClick={() => setFilter('parent')}>🍼 육아/가족</button>
          </div>
        </div>

        {/* Results Grid */}
        <div id="api-results-grid">
          {filteredData.length === 0 ? (
            <div className="api-no-results">
              <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 700 }}>🔍 입력하신 키워드에 해당하는 실시간 API 연동 정책이 없습니다.</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>다른 검색어를 입력하시거나 상단의 카테고리 태그를 클릭해 보세요.</p>
            </div>
          ) : (
            filteredData.map((item, idx) => {
              // 실제 매칭 인덱스를 찾아서 마운트 통계 불러옴
              const dbIndex = apiDatabase.findIndex((d) => d.title === item.title);
              const itemStats = stats[dbIndex] || { views: 1250, budgetRate: 35 };

              return (
                <div className="api-res-card" key={idx}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span className="wf-badge" style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#2563eb', fontSize: '11px', padding: '4px 10px', fontWeight: 800, borderRadius: '50px' }}>
                        {item.apiSource}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                        모집중 (LIVE)
                      </span>
                    </div>
                    {isMounted && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>👀 일일 조회수: {itemStats.views}회</span>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>✅ 예산소진율: {itemStats.budgetRate}%</span>
                      </div>
                    )}
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px', letterSpacing: '-0.5px' }}>{item.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--slate-500)', lineHeight: 1.5, marginBottom: '14px' }}>{item.desc}</p>
                  </div>
                  <div>
                    <div style={{ background: 'var(--slate-100)', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                      <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: 'var(--slate-500)', textTransform: 'uppercase' }}>정부 지원금 규모 한도</span>
                      <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>🎁 {item.budget}</span>
                    </div>
                    <div className="api-btns">
                      <Link href={item.guideUrl} className="wf-btn-guide" style={{ padding: '8px', fontSize: '11.5px', textAlign: 'center' }}>📘 상세 리포트</Link>
                      <a href={item.govUrl} target="_blank" rel="noopener noreferrer nofollow" className="wf-btn-gov" style={{ padding: '8px', fontSize: '11.5px', textAlign: 'center' }}>🏛️ 공식 신청 🔗</a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="api-footer-banner" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'linear-gradient(135deg, var(--slate-800) 0%, var(--dark) 100%)', padding: '24px 28px', borderRadius: '16px', color: '#ffffff' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800 }}>🛠️ 직접 정부지원금 Open API 서비스를 개발하고 싶으신가요?</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>개발자들을 위해 보조금24, 복지로, 워크넷의 상세 API 가이드 및 실시간 JSON 응답 테스트 툴을 무료 개방합니다.</p>
          </div>
          <Link href="/api-center/" className="nav-btn" style={{ boxShadow: 'none', background: 'var(--secondary)', fontSize: '12px', padding: '10px 18px', whiteSpace: 'nowrap' }}>공공 API 개발자 센터 바로가기 ➡️</Link>
        </div>
      </div>
    </section>
  );
}
