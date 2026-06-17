import Link from 'next/link';
import WelfareFinder from '../components/WelfareFinder';
import ApiDashboard from '../components/ApiDashboard';
import { getSortedArticlesData } from '../lib/articles';

export default function Home() {
  const articles = getSortedArticlesData();

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span>📢</span> 2026년 신규 보도자료 및 가이드 반영 완료
        </div>
        <h1>나에게 꼭 맞는 <span>정부 지원금</span>, <br />헤매지 않고 3초 만에 찾기</h1>
        <p>복잡하고 파편화된 대한민국 정부 복지 혜택과 지원금 정보를 내 상황에 맞춰 모의 자가진단하고, 공식 정부 신청 포털로 직접 연결해 드립니다.</p>
      </section>

      {/* Welfare Finder Widget (Client Component) */}
      <WelfareFinder />

      {/* Live API Dashboard (Client Component) */}
      <ApiDashboard />

      {/* Recent Articles */}
      <section className="recent-articles" id="articles">
        <div className="section-header">
          <div>
            <h2>📚 E-E-A-T 기반 정책 안내 리포트</h2>
            <p>엄격한 팩트 체크와 복지 가이드라인을 담은 정책 분석 자료실입니다.</p>
          </div>
        </div>

        <div className="articles-grid">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}/`} className="article-card-link" key={article.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="article-card">
                <div>
                  <span className="article-cat">{article.category}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.description}</p>
                </div>
                <span className="article-link">분석 리포트 전체 읽기 ➡️</span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Expert Commentary Essay */}
      <section className="guide-essay-section" style={{ maxWidth: '800px', margin: '80px auto', padding: '0 24px', borderTop: '1px solid #e2e8f0', paddingTop: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>📈 2026년 대한민국 복지 정책 트렌드 및 자산관리 가이드</h2>
        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#334155' }}>
          현대 사회에서 자산 관리는 더 이상 단순히 은행에 저축하고 주식에 투자하는 것만을 의미하지 않습니다. 특히 2026년 급변하는 거시경제 지표와 고금리 기조의 완화 기대감 속에서, 대한민국 정부가 발표하는 다양한 복지 정책과 국가지원금 제도를 정확히 이해하고 활용하는 것은 가장 안전하고 확실한 수익률을 보장하는 <strong>'숨겨진 재테크(Hidden Tech)'</strong>의 핵심입니다. K-복지 리서치랩의 김지민 센터장은 다년간의 자산운용 컨설팅 경험을 바탕으로, 일반 금융 상품의 수익률을 상회하는 정부 정책 금융의 가치를 분석하고 이를 전 국민이 쉽게 접근할 수 있도록 이 가이드를 작성했습니다.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#334155' }}>
          첫째, 청년층을 위한 자산 형성 지원 사업의 패러다임 변화를 주목해야 합니다. 과거의 정책이 단순한 현금성 지원(Cash Transfer)에 그쳤다면, 2026년형 청년도약계좌와 내일채움공제 등은 청년의 근로 의욕을 고취시키고 장기적인 자산 형성의 복리 효과(Compound Interest Effect)를 극대화하도록 설계되었습니다. 일반 시중 은행의 적금 금리가 3~4%대에 머무는 현실에서, 비과세 혜택과 정부 기여금을 더해 연 환산 수익률 8~10% 이상을 기대할 수 있는 이러한 정책 금융 상품은 자산 포트폴리오의 든든한 '안전 자산(Safe Haven)' 역할을 수행합니다. 따라서 19세부터 34세 이하의 청년들은 본인의 소득 구간을 정확히 파악하여, 가입 가능한 최대한도까지 이러한 정책 상품을 활용하는 것이 자산 증식의 첫 단추입니다.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#334155' }}>
          둘째, 주거 안정과 관련된 대출 정책의 세분화 현상입니다. 디딤돌 대출, 신생아 특례 대출, 청년 버팀목 전세자금 대출 등은 부동산 시장의 변동성 속에서도 서민들의 주거 비용(Housing Cost) 부담을 획기적으로 낮춰줍니다. 특히 DSR(총부채원리금상환비율) 규제가 엄격해진 현 금융 환경에서, 이러한 정부 주도 모기지(Mortgage) 상품들은 시중 은행 대비 압도적으로 낮은 1~2%대의 고정 금리를 제공하여 금리 인상 리스크를 완벽하게 헷지(Hedge)해 줍니다. K-복지 알리미의 실시간 대시보드는 바로 이러한 주거 대출의 자격 요건(무주택 세대주 여부, 합산 소득 기준 등)을 3초 만에 필터링하여, 사용자가 불필요한 서류 검토에 시간을 낭비하지 않도록 돕습니다.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#334155' }}>
          셋째, 소상공인과 자영업자를 위한 금융 안전망(Financial Safety Net)의 질적 고도화입니다. 대내외적 경제 불확실성과 내수 침체 장기화로 인해 많은 소상공인들이 흑자 부도나 유동성 위기(Liquidity Crisis)에 직면하고 있습니다. 이에 정부는 단순한 만기 연장이나 이자 유예를 넘어, 스마트 상점 구축 지원, 저금리 대환 대출, 고용유지지원금 등 경영의 체질을 개선할 수 있는 맞춤형 자금을 공급하고 있습니다. 자산관리사의 관점에서 볼 때, 사업장을 운영하는 대표님들은 매 분기마다 업데이트되는 소상공인시장진흥공단의 공고를 모니터링하고, 본인의 업종과 매출 규모에 맞는 정책 자금을 적기에 조달하는 능력을 반드시 갖추어야 합니다. 이는 기업의 생존율을 높이는 가장 확실한 자본 조달(Capital Raising) 전략입니다.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#334155' }}>
          결론적으로, 정부 지원금과 복지 정책은 단순히 '운 좋게 받는 꽁돈'이 아닙니다. 이는 내가 성실히 납부한 세금을 합법적이고 효율적으로 환급받는 과정이며, 가구의 가처분 소득(Disposable Income)을 극대화하는 가장 강력한 재무 설계 도구입니다. K-복지 리서치랩은 파편화된 공공데이터포털과 복지로의 수많은 정보의 바다 속에서, 오직 사용자 개개인에게 최적화된(Personalized) 알짜배기 정책만을 정제하여 제공할 것을 약속드립니다. 앞으로도 저희 전문가 팀이 발행하는 심층 아티클을 통해, 누구보다 스마트하게 대한민국의 복지 혜택을 100% 누리시길 바랍니다.
        </p>
      </section>
    </main>
  );
}
