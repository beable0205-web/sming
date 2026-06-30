import Link from "next/link";
import Script from "next/script";
import ThemeToggle from "../components/ThemeToggle";
import AdMobManager from "../components/AdMobManager";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.paradise-hero.com"),
  title: "K-복지 리서치랩 | 대한민국 복지 정책 및 지원금 가이드",
  description: "2026년 대한민국 공공 기관 보도자료 기준 최신 복지 및 지원금 요건 정밀 분석 보고서",
  openGraph: {
    type: "website",
    title: "K-복지 리서치랩 | 대한민국 복지 정책 및 지원금 가이드",
    description: "2026년 대한민국 공공 기관 보도자료 기준 최신 복지 및 지원금 요건 정밀 분석 보고서",
    images: [{ url: "/logo.png" }],
    url: "https://www.paradise-hero.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "K-복지 리서치랩 | 대한민국 복지 정책 및 지원금 가이드",
    description: "2026년 대한민국 공공 기관 보도자료 기준 최신 복지 및 지원금 요건 정밀 분석 보고서",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏛️</text></svg>",
  },
  alternates: {
    canonical: "https://www.paradise-hero.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4633321310054654"
          crossorigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AdMobManager />
        {/* Header */}
        <header>
          <div className="nav-container">
            <div className="logo">
              <Link href="/">🏛️ K-복지 리서치랩</Link>
            </div>
            <nav>
              <ul>
                <li><Link href="/">홈으로</Link></li>
                <li><Link href="/#finder">모의진단</Link></li>
                <li><Link href="/#api-dashboard">실시간검색</Link></li>
                <li><Link href="/api-center/">개발자센터</Link></li>
                <li><Link href="/about/">소개</Link></li>
              </ul>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/#finder" className="nav-btn">지금 시작하기</Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer>
          <div className="footer-top">
            <div className="footer-brand">
              <h3>🏛️ K-복지 리서치랩</h3>
              <p>대한민국 전 국민이 몰라서 정책 혜택을 놓치는 일이 없도록 돕는 공공 서비스 정보 제공 채널입니다.</p>
            </div>
            <div className="footer-links">
              <h4>법적 필수 공지 사항</h4>
              <ul>
                <li><Link href="/privacy/">개인정보처리방침 (AdSense)</Link></li>
                <li><Link href="/terms/">서비스 이용약관</Link></li>
                <li><Link href="/about/">사이트 소개 및 연락망</Link></li>
                <li><Link href="/api-center/">API 개발자 센터</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>정부 공식 누리집 연계</h4>
              <ul>
                <li><a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer">복지로 포털</a></li>
                <li><a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer">정부24 민원센터</a></li>
                <li><a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer">국세청 홈택스</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-trust-info">
              <span>사이트명: <strong>K-복지 리서치랩</strong></span>
              <span>대표자 및 총괄 에디터: <strong>김지민 센터장 (현직 자산운용 컨설턴트)</strong></span>
              <span>이메일: <strong>contact@paradise-hero.com</strong></span>
              <span>주소: <strong>서울특별시 강남구 테헤란로 152, 강남파이낸스센터 14층 K-복지 리서치랩</strong></span>
            </div>
            <p className="copyright">&copy; 2026 K-복지 리서치랩. All Rights Reserved. 본 사이트의 진단 데이터 및 포스팅 내용은 정보 탐색 가이드용이며 법률적 신청 효력은 정부 공식 신청처에서 확인하셔야 합니다.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
