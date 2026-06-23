// 아티클 = content/articles/*.md 파일. 파일을 떨구기만 하면 자동 등록된다.
// (백엔드 CMS가 생기면 이 로더만 fetch 기반으로 교체)

export interface Article {
  slug: string; // 파일명 (= URL: /articles/:slug)
  title: string;
  date: string; // YYYY-MM-DD
  author: string;
  category: string; // 큐레이션 · 분석 · 에세이 등
  tags: string[];
  excerpt: string;
  featured: boolean;
  content: string; // 마크다운 본문
  readingMinutes: number;
}

// --- 아주 작은 프론트매터 파서 (key: value / [a, b] 배열 / true|false) ---
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: match[2].trim() };
}

function readingMinutes(body: string): number {
  // 한글 기준 분당 ~500자 가정
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

// Vite glob — 빌드시 모든 md를 원문으로 가져옴
const files = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function toArticle(path: string, raw: string): Article {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    author: (data.author as string) ?? '너울',
    category: (data.category as string) ?? '아티클',
    tags: (data.tags as string[]) ?? [],
    excerpt: (data.excerpt as string) ?? body.slice(0, 80),
    featured: (data.featured as boolean) ?? false,
    content: body,
    readingMinutes: readingMinutes(body),
  };
}

export const ARTICLES: Article[] = Object.entries(files)
  .map(([path, raw]) => toArticle(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // 최신순

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const FEATURED_ARTICLES = ARTICLES.filter((a) => a.featured);
