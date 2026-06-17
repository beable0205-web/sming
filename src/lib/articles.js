import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// 모든 아티클 목록 가져오기 (메타데이터만 추출)
export function getSortedArticlesData() {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter로 frontmatter 파싱
      const matterResult = matter(fileContents);

      return {
        slug,
        ...matterResult.data,
      };
    });

  // 날짜 기준으로 내림차순 정렬 (최신글이 먼저 오도록)
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function disableIndentedCode() {
  const data = this.data();
  function add(field, value) {
    const list = data[field] ? data[field] : (data[field] = []);
    list.push(value);
  }
  add("micromarkExtensions", {
    disable: {
      null: ["codeIndented"]
    }
  });
}

// 특정 아티클 상세 내용 가져오기 (마크다운 ➡️ HTML 변환)
export async function getArticleData(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matter로 frontmatter 파싱
  const matterResult = matter(fileContents);

  // remark를 사용하여 마크다운을 HTML 문자열로 변환
  // 여기서는 본문이 이미 HTML 형식이거나 마크다운 형식이 섞여 있으므로, 
  // matterResult.content를 HTML로 변환합니다.
  const processedContent = await remark()
    .use(disableIndentedCode)
    .use(html, { sanitize: false }) // 기존 HTML 마크업도 그대로 통과시키기 위해 sanitize: false 설정
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

// 모든 아티클의 slug 목록 가져오기 (generateStaticParams용)
export function getAllArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}
