import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleData, getAllArticleSlugs } from '../../../lib/articles';
import WelfareShare from '../../../components/WelfareShare';

// 빌드 타임에 정적 경로 생성
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug);
  
  if (!article) return {};
  
  return {
    title: `${article.seoTitle || article.title} | K-복지 리서치랩`,
    description: article.description,
    alternates: {
      canonical: `https://www.paradise-hero.com/articles/${slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${article.seoTitle || article.title} | K-복지 리서치랩`,
      description: article.description,
      url: `https://www.paradise-hero.com/articles/${slug}/`,
      images: [{ url: "/logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.seoTitle || article.title} | K-복지 리서치랩`,
      description: article.description,
    }
  };
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-wrapper">
      <div className="article-header">
        <span className="cat-badge">{article.category}</span>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>에디터: <strong>{article.author}</strong></span>
          <span>최종 업데이트: <strong>{article.date}</strong></span>
          {/* 조회수는 정적인 임의값 또는 연출로 유지 (기존 UI 호환) */}
          <span>조회수: <strong>{Math.floor(slug.charCodeAt(0) * 85 + 4500)}회</strong></span>
        </div>
      </div>

      <article className="article-body">
        {/* 마크다운에서 변환된 HTML 본문 렌더링 */}
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        
        {/* 📢 소셜 공유 위젯 (Client Component) */}
        <WelfareShare />
      </article>
    </main>
  );
}
