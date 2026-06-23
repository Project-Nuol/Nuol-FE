import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticle } from '../lib/articles';
import { articleGradient } from '../lib/gradient';
import { Badge, Chip } from '../components/ui';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) {
    return (
      <div className="grid place-items-center py-24 text-center">
        <p className="text-fg-muted">아티클을 찾을 수 없어요.</p>
        <Link to="/articles" className="mt-3 text-sm text-brand-400 hover:text-brand-300">
          ← 아티클 목록으로
        </Link>
      </div>
    );
  }

  const grad = articleGradient(article.slug);

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/articles"
        className="text-sm text-fg-muted transition-colors hover:text-brand-400"
      >
        ← 아티클
      </Link>

      {/* 헤더 (표지 없는 그라데이션 배너) */}
      <header className="mt-4">
        <div
          className="mb-6 h-40 rounded-xl border border-line"
          style={{ background: grad.background }}
        />
        <Badge tone="brand">{article.category}</Badge>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-fg">
          {article.title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-fg-subtle">
          <span>{article.author}</span>
          {article.date && <span>· {article.date}</span>}
          <span>· {article.readingMinutes}분 읽기</span>
        </div>
      </header>

      {/* 본문 */}
      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-a:text-brand-400 prose-blockquote:border-brand-500 prose-strong:text-fg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </div>

      {/* 태그 */}
      {article.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-1.5 border-t border-line pt-6">
          {article.tags.map((t) => (
            <Chip key={t}>#{t}</Chip>
          ))}
        </div>
      )}
    </article>
  );
}
