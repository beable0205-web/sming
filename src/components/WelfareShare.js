'use client';

import { useEffect, useState } from 'react';

export default function WelfareShare() {
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const shareKakao = () => {
    window.open('https://share.kakao.com/talk/friends/picker/link?url=' + encodeURIComponent(pageUrl));
  };

  const shareFacebook = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl));
  };

  const shareTwitter = () => {
    const shareText = document.title;
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(pageUrl));
  };

  const copyPageUrl = () => {
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        alert('이 유용한 정책 가이드 주소가 클립보드에 성공적으로 복사되었습니다! 카카오톡방이나 지인 대화방에 Ctrl+V로 붙여넣어 공유해 보세요.');
      })
      .catch(() => {
        // Fallback for older browsers
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = pageUrl;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('이 유용한 정책 가이드 주소가 클립보드에 성공적으로 복사되었습니다! 카카오톡방이나 지인 대화방에 Ctrl+V로 붙여넣어 공유해 보세요.');
      });
  };

  return (
    <div className="share-container" style={{ marginTop: '48px', padding: '28px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
      <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--dark)', marginBottom: '6px' }}>📢 소중한 가족과 지인들에게 이 복지 혜택을 알려주세요!</h4>
      <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginBottom: '20px' }}>우측 상단 3단 점 또는 아래 버튼을 통해 쉽게 공유하실 수 있습니다.</p>
      <div className="share-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={shareKakao} style={{ background: '#fee500', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, color: '#191919', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>💬</span> 카카오톡 공유
        </button>
        <button onClick={shareFacebook} style={{ background: '#1877f2', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>👥</span> 페이스북
        </button>
        <button onClick={shareTwitter} style={{ background: '#000000', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>𝕏</span> 트위터 공유
        </button>
        <button onClick={copyPageUrl} style={{ background: 'var(--slate-700)', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🔗</span> 링크 주소 복사
        </button>
      </div>
    </div>
  );
}
